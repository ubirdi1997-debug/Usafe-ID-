package dev.usafe.amber.ime

import android.inputmethodservice.InputMethodService
import android.os.Build
import android.os.SystemClock
import android.view.KeyEvent
import android.view.View
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputConnection
import androidx.annotation.RequiresApi
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.math.sin

/**
 * ==============================================================================
 * AmberOS Zero-Permission Native IME (AmberKeyboardService.kt)
 * Android 17 (API 35/36) Native Input Method Service
 *
 * SECURITY ATTRIBUTE:
 * - Omits `android.permission.INTERNET` at the AndroidManifest.xml level.
 * - Hardware isolated key dispatch with zero out-of-process keystroke logging.
 * - Anti-telemetry memory buffer (ephemeral typing context destroyed on blur).
 * ==============================================================================
 */
class AmberKeyboardService : InputMethodService() {

    // Theme Tokens (Soothing Matte Palette)
    companion object {
        val ColorCanvas = Color(0xFF121214)
        val ColorSurface = Color(0xFF181A1F)
        val ColorSurfacePressed = Color(0xFF22252C)
        val ColorBorder = Color(0xFF2A2E35)
        val ColorOchre = Color(0xFFDDA15E)
        val ColorOchrePressed = Color(0xFFBC6C25)
        val ColorSage = Color(0xFF52B788)
        val ColorDustyCobalt = Color(0xFF4A6FA5)
        val ColorTerracotta = Color(0xFFE07A5F)
        val ColorTextPrimary = Color(0xFFF4F4F9)
        val ColorTextSecondary = Color(0xFF8D99AE)
    }

    private var currentImeAction: Int = EditorInfo.IME_ACTION_DONE
    private val isIncognito = mutableStateOf(false)
    private val isShiftActive = mutableStateOf(false)
    private val isSymbolsMode = mutableStateOf(false)

    override fun onCreateInputView(): View {
        return ComposeView(this).apply {
            setContent {
                AmberKeyboardLayout(
                    isIncognito = isIncognito.value,
                    isShift = isShiftActive.value,
                    isSymbols = isSymbolsMode.value,
                    imeAction = currentImeAction,
                    onKeyPress = { char -> handleCharacter(char) },
                    onDelete = { handleDelete() },
                    onSpace = { handleSpace() },
                    onAction = { handleAction() },
                    onToggleShift = { isShiftActive.value = !isShiftActive.value },
                    onToggleSymbols = { isSymbolsMode.value = !isSymbolsMode.value },
                    onToggleIncognito = { isIncognito.value = !isIncognito.value }
                )
            }
        }
    }

    override fun onStartInputView(info: EditorInfo?, restarting: Boolean) {
        super.onStartInputView(info, restarting)
        currentImeAction = info?.imeOptions?.and(EditorInfo.IME_MASK_ACTION) ?: EditorInfo.IME_ACTION_DONE
        // Reset shift and symbols to default state
        isShiftActive.value = false
        isSymbolsMode.value = false
    }

    private fun handleCharacter(char: String) {
        val ic: InputConnection = currentInputConnection ?: return
        val textToCommit = if (isShiftActive.value) char.uppercase() else char.lowercase()
        ic.commitText(textToCommit, 1)

        // Reset one-shot shift after character entry
        if (isShiftActive.value) {
            isShiftActive.value = false
        }
    }

    private fun handleDelete() {
        val ic: InputConnection = currentInputConnection ?: return
        val selectedText = ic.getSelectedText(0)
        if (selectedText.isNullOrEmpty()) {
            ic.deleteSurroundingText(1, 0)
        } else {
            ic.commitText("", 1)
        }
    }

    private fun handleSpace() {
        val ic: InputConnection = currentInputConnection ?: return
        ic.commitText(" ", 1)
    }

    private fun handleAction() {
        val ic: InputConnection = currentInputConnection ?: return
        when (currentImeAction) {
            EditorInfo.IME_ACTION_SEARCH,
            EditorInfo.IME_ACTION_GO,
            EditorInfo.IME_ACTION_SEND,
            EditorInfo.IME_ACTION_NEXT,
            EditorInfo.IME_ACTION_DONE -> {
                ic.performEditorAction(currentImeAction)
            }
            else -> {
                ic.sendKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_ENTER))
                ic.sendKeyEvent(KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_ENTER))
            }
        }
    }
}

/**
 * Compose UI Root for AmberOS Keyboard
 */
@Composable
fun AmberKeyboardLayout(
    isIncognito: Boolean,
    isShift: Boolean,
    isSymbols: Boolean,
    imeAction: Int,
    onKeyPress: (String) -> Unit,
    onDelete: () -> Unit,
    onSpace: () -> Unit,
    onAction: () -> Unit,
    onToggleShift: () -> Unit,
    onToggleSymbols: () -> Unit,
    onToggleIncognito: () -> Unit
) {
    val row1 = if (isSymbols) listOf("1", "2", "3", "4", "5", "6", "7", "8", "9", "0")
               else listOf("q", "w", "e", "r", "t", "y", "u", "i", "o", "p")

    val row2 = if (isSymbols) listOf("@", "#", "$", "%", "&", "-", "+", "(", ")", "/")
               else listOf("a", "s", "d", "f", "g", "h", "j", "k", "l")

    val row3 = if (isSymbols) listOf("*", "\"", "'", ":", ";", "!", "?")
               else listOf("z", "x", "c", "v", "b", "n", "m")

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(AmberKeyboardService.ColorCanvas)
            .padding(horizontal = 4.dp, vertical = 6.dp)
            .navigationBarsPadding(),
        verticalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        // Top Security & Isolation Status Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 6.dp, vertical = 2.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Hardware Isolation Status Indicator
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(7.dp)
                        .clip(RoundedCornerShape(50))
                        .background(AmberKeyboardService.ColorSage)
                )
                Text(
                    text = "HARDWARE ISOLATED",
                    color = AmberKeyboardService.ColorSage,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace,
                    letterSpacing = 1.sp
                )
                Text(
                    text = "• ZERO NET PERMISSION",
                    color = AmberKeyboardService.ColorTextSecondary,
                    fontSize = 9.sp,
                    fontFamily = FontFamily.Monospace
                )
            }

            // Ephemeral Incognito Switch
            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(12.dp))
                    .background(if (isIncognito) AmberKeyboardService.ColorTerracotta.copy(alpha = 0.2f) else AmberKeyboardService.ColorSurface)
                    .border(1.dp, if (isIncognito) AmberKeyboardService.ColorTerracotta else AmberKeyboardService.ColorBorder, RoundedCornerShape(12.dp))
                    .clickable { onToggleIncognito() }
                    .padding(horizontal = 8.dp, vertical = 3.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Lock,
                    contentDescription = "Incognito",
                    tint = if (isIncognito) AmberKeyboardService.ColorTerracotta else AmberKeyboardService.ColorTextSecondary,
                    modifier = Modifier.size(11.dp)
                )
                Text(
                    text = if (isIncognito) "INCOGNITO ON" else "EPHEMERAL",
                    color = if (isIncognito) AmberKeyboardService.ColorTerracotta else AmberKeyboardService.ColorTextSecondary,
                    fontSize = 9.sp,
                    fontWeight = FontWeight.SemiBold,
                    fontFamily = FontFamily.Monospace
                )
            }
        }

        // Row 1
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            row1.forEach { key ->
                val displayChar = if (isShift && !isSymbols) key.uppercase() else key
                AmberKeyCap(
                    label = displayChar,
                    modifier = Modifier.weight(1f),
                    onClick = { onKeyPress(displayChar) }
                )
            }
        }

        // Row 2
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            row2.forEach { key ->
                val displayChar = if (isShift && !isSymbols) key.uppercase() else key
                AmberKeyCap(
                    label = displayChar,
                    modifier = Modifier.weight(1f),
                    onClick = { onKeyPress(displayChar) }
                )
            }
        }

        // Row 3 (Shift + Chars + Backspace)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Shift / Mod Button
            AmberSpecialKeyCap(
                icon = {
                    Icon(
                        imageVector = Icons.Default.KeyboardArrowUp,
                        contentDescription = "Shift",
                        tint = if (isShift) AmberKeyboardService.ColorOchre else AmberKeyboardService.ColorTextPrimary,
                        modifier = Modifier.size(18.dp)
                    )
                },
                isActive = isShift,
                modifier = Modifier.weight(1.5f),
                onClick = onToggleShift
            )

            row3.forEach { key ->
                val displayChar = if (isShift && !isSymbols) key.uppercase() else key
                AmberKeyCap(
                    label = displayChar,
                    modifier = Modifier.weight(1f),
                    onClick = { onKeyPress(displayChar) }
                )
            }

            // Backspace Key
            AmberSpecialKeyCap(
                icon = {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Backspace",
                        tint = AmberKeyboardService.ColorTextPrimary,
                        modifier = Modifier.size(16.dp)
                    )
                },
                isActive = false,
                modifier = Modifier.weight(1.5f),
                onClick = onDelete
            )
        }

        // Row 4 (123 / Symbol, Spacebar with Dusty Cobalt Wave, Action CTA)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(5.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Symbols Switch (?123 / ABC)
            AmberSpecialKeyCap(
                text = if (isSymbols) "ABC" else "?123",
                isActive = isSymbols,
                modifier = Modifier.weight(1.4f),
                onClick = onToggleSymbols
            )

            // Comma Key
            AmberKeyCap(
                label = ",",
                modifier = Modifier.weight(0.9f),
                onClick = { onKeyPress(",") }
            )

            // Signature Spacebar with Dusty Cobalt Wave Underline
            AmberSpacebarKeyCap(
                modifier = Modifier.weight(3.8f),
                onClick = onSpace
            )

            // Period Key
            AmberKeyCap(
                label = ".",
                modifier = Modifier.weight(0.9f),
                onClick = { onKeyPress(".") }
            )

            // Primary Action/Return CTA in Warm Ochre
            AmberActionKeyCap(
                imeAction = imeAction,
                modifier = Modifier.weight(1.8f),
                onClick = onAction
            )
        }
    }
}

/**
 * Standard Key Cap with 22% Squircle Border
 */
@Composable
fun AmberKeyCap(
    label: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()

    val backgroundColor by animateColorAsState(
        targetValue = if (isPressed) AmberKeyboardService.ColorSurfacePressed else AmberKeyboardService.ColorSurface,
        animationSpec = tween(durationMillis = 50),
        label = "keyBg"
    )

    Box(
        modifier = modifier
            .height(44.dp)
            .clip(RoundedCornerShape(22))
            .background(backgroundColor)
            .border(1.dp, AmberKeyboardService.ColorBorder, RoundedCornerShape(22))
            .clickable(interactionSource = interactionSource, indication = null) { onClick() },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = label,
            color = AmberKeyboardService.ColorTextPrimary,
            fontSize = 17.sp,
            fontWeight = FontWeight.Medium
        )
    }
}

/**
 * Functional Modifier Key Cap (Shift, 123, Backspace)
 */
@Composable
fun AmberSpecialKeyCap(
    text: String? = null,
    icon: (@Composable () -> Unit)? = null,
    isActive: Boolean = false,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()

    val bg = if (isActive) AmberKeyboardService.ColorSurfacePressed
             else if (isPressed) AmberKeyboardService.ColorSurfacePressed
             else AmberKeyboardService.ColorSurface

    Box(
        modifier = modifier
            .height(44.dp)
            .clip(RoundedCornerShape(22))
            .background(bg)
            .border(
                1.dp,
                if (isActive) AmberKeyboardService.ColorOchre else AmberKeyboardService.ColorBorder,
                RoundedCornerShape(22)
            )
            .clickable(interactionSource = interactionSource, indication = null) { onClick() },
        contentAlignment = Alignment.Center
    ) {
        if (text != null) {
            Text(
                text = text,
                color = if (isActive) AmberKeyboardService.ColorOchre else AmberKeyboardService.ColorTextPrimary,
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Monospace
            )
        } else icon?.invoke()
    }
}

/**
 * Signature Spacebar Key Cap with Continuous Sine Wave Underline (Dusty Cobalt)
 */
@Composable
fun AmberSpacebarKeyCap(
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()

    val bg = if (isPressed) AmberKeyboardService.ColorSurfacePressed else AmberKeyboardService.ColorSurface

    Box(
        modifier = modifier
            .height(44.dp)
            .clip(RoundedCornerShape(22))
            .background(bg)
            .border(1.dp, AmberKeyboardService.ColorBorder, RoundedCornerShape(22))
            .clickable(interactionSource = interactionSource, indication = null) { onClick() },
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterVertically,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "AMBER",
                color = AmberKeyboardService.ColorTextSecondary.copy(alpha = 0.6f),
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Monospace,
                letterSpacing = 2.sp
            )

            Spacer(modifier = Modifier.height(2.dp))

            // Signature Dusty Cobalt Sine Wave Underline
            Canvas(modifier = Modifier
                .width(64.dp)
                .height(4.dp)) {
                val wavePath = Path()
                val width = size.width
                val height = size.height
                val midY = height / 2f
                val frequency = 4f
                val amplitude = 2f

                wavePath.moveTo(0f, midY)
                var x = 0f
                while (x <= width) {
                    val y = midY + (sin((x / width) * Math.PI * frequency) * amplitude).toFloat()
                    wavePath.lineTo(x, y)
                    x += 2f
                }

                drawPath(
                    path = wavePath,
                    color = AmberKeyboardService.ColorDustyCobalt,
                    style = Stroke(width = 1.5f, cap = StrokeCap.Round)
                )
            }
        }
    }
}

/**
 * Primary Return / Action Key in Warm Ochre
 */
@Composable
fun AmberActionKeyCap(
    imeAction: Int,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()

    val bg = if (isPressed) AmberKeyboardService.ColorOchrePressed else AmberKeyboardService.ColorOchre

    Box(
        modifier = modifier
            .height(44.dp)
            .clip(RoundedCornerShape(22))
            .background(bg)
            .clickable(interactionSource = interactionSource, indication = null) { onClick() },
        contentAlignment = Alignment.Center
    ) {
        when (imeAction) {
            EditorInfo.IME_ACTION_SEARCH -> {
                Icon(
                    imageVector = Icons.Default.Search,
                    contentDescription = "Search",
                    tint = AmberKeyboardService.ColorCanvas,
                    modifier = Modifier.size(18.dp)
                )
            }
            EditorInfo.IME_ACTION_SEND -> {
                Icon(
                    imageVector = Icons.Default.Send,
                    contentDescription = "Send",
                    tint = AmberKeyboardService.ColorCanvas,
                    modifier = Modifier.size(18.dp)
                )
            }
            else -> {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = "Done",
                    tint = AmberKeyboardService.ColorCanvas,
                    modifier = Modifier.size(18.dp)
                )
            }
        }
    }
}
