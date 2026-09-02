export type Region = 'in' | 'net';

export interface DomainConfig {
  region: Region;
  primaryDomain: string;
  currencySymbol: string;
  currencyCode: string;
  tld: string;
  regionLabel: string;
  flag: string;
}

export const REGIONS: Record<Region, DomainConfig> = {
  in: {
    region: 'in',
    primaryDomain: 'www.usafe.in',
    currencySymbol: '₹',
    currencyCode: 'INR',
    tld: '.in',
    regionLabel: 'India (Domestic Hub)',
    flag: '🇮🇳',
  },
  net: {
    region: 'net',
    primaryDomain: 'www.usafe.net',
    currencySymbol: '$',
    currencyCode: 'USD',
    tld: '.net',
    regionLabel: 'Global (International Alias)',
    flag: '🌐',
  },
};

/**
 * Resolves current active region from hostname, cookies, or localStorage
 */
export function detectRegion(): Region {
  if (typeof window === 'undefined') return 'in';

  // Check URL query override first (e.g. ?region=net)
  const urlParams = new URLSearchParams(window.location.search);
  const regionParam = urlParams.get('region');
  if (regionParam === 'net' || regionParam === 'in') {
    return regionParam;
  }

  // Check localStorage
  const stored = localStorage.getItem('usafe_preferred_region');
  if (stored === 'net' || stored === 'in') {
    return stored;
  }

  // Inspect hostname
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.endsWith('.net')) {
    return 'net';
  }

  // Default to .in for domestic primary hub
  return 'in';
}

/**
 * Save user preferred region
 */
export function setPreferredRegion(region: Region): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('usafe_preferred_region', region);
  document.cookie = `usafe_region=${region}; path=/; max-age=31536000; SameSite=Lax`;
}

/**
 * Generates dynamic subdomain URL preserving current .in vs .net scope
 */
export function getSubdomainUrl(subdomain: string, region?: Region): string {
  const activeRegion = region || detectRegion();
  const tld = activeRegion === 'net' ? 'net' : 'in';
  return `https://${subdomain}.usafe.${tld}`;
}

export const SUBDOMAINS = {
  auth: (r?: Region) => getSubdomainUrl('auth', r),
  account: (r?: Region) => getSubdomainUrl('account', r),
  uchat: (r?: Region) => getSubdomainUrl('uchat', r),
  kite: (r?: Region) => getSubdomainUrl('kite', r),
  upay: (r?: Region) => getSubdomainUrl('upay', r),
  office: (r?: Region) => getSubdomainUrl('office', r),
  notes: (r?: Region) => getSubdomainUrl('notes', r),
  aura: (r?: Region) => getSubdomainUrl('aura', r),
  api: (r?: Region) => getSubdomainUrl('api', r),
  mesh: (r?: Region) => getSubdomainUrl('mesh', r),
};
