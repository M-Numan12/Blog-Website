export const SITE_CONFIG = {
  name: 'CelebScope',
  tagline: 'Clear, well-researched profiles and entertainment stories about the people shaping popular culture.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const NAV_LINKS = [
  { label: 'Celebrities', href: '/celebrities' },
  { label: 'Actors', href: '/actors' },
  { label: 'Singers', href: '/singers' },
  { label: 'Influencers', href: '/influencers' },
  { label: 'Trending', href: '/trending' },
];

export const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Editorial Policy', href: '/editorial-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
];
