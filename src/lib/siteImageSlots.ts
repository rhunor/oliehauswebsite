// Canonical registry of every admin-editable image "slot" on the public site.
// Each slot's `src`/`alt` here is the original static default — the site keeps
// showing these until an admin uploads a replacement (see SiteImage model).
const GITHUB_CDN_BASE = 'https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main';

export type SiteImagePage = 'Home' | 'About' | 'Services' | 'Contact' | 'Testimonials';

export interface SiteImageSlot {
  key: string;
  page: SiteImagePage;
  label: string;
  src: string;
  alt: string;
}

const homeHeroAlts = [
  'Elegant luxury living room with contemporary furniture and sophisticated lighting',
  'Modern luxury kitchen with premium finishes and state-of-the-art appliances',
  'Modern luxury kitchen with premium finishes and state-of-the-art appliances',
  ...Array(17).fill('Serene master bedroom with custom millwork and luxury bedding'),
];

const HOME_HERO_SLOTS: SiteImageSlot[] = Array.from({ length: 20 }, (_, i) => ({
  key: `home.hero.${i + 1}`,
  page: 'Home',
  label: `Hero slideshow — slide ${i + 1}`,
  src: `${GITHUB_CDN_BASE}/images/hero/${i + 1}.webp`,
  alt: homeHeroAlts[i] ?? 'Luxury interior design showcase',
}));

const HOME_ABOUT_TEASER_SLOT: SiteImageSlot = {
  key: 'home.aboutTeaser',
  page: 'Home',
  label: 'About Us teaser photo',
  src: `${GITHUB_CDN_BASE}/about/28.webp`,
  alt: 'OliveHaus luxury interior design showcase',
};

const HOME_CLOSING_BG_SLOT: SiteImageSlot = {
  key: 'home.closingBg',
  page: 'Home',
  label: 'Closing tagline background',
  src: `${GITHUB_CDN_BASE}/images/hero/2.webp`,
  alt: '',
};

const ABOUT_HERO_SLOT: SiteImageSlot = {
  key: 'about.hero',
  page: 'About',
  label: 'Hero photo',
  src: `${GITHUB_CDN_BASE}/images/hero/1.webp`,
  alt: 'Luxury living room interior',
};

const ABOUT_PORTRAIT_SLOT: SiteImageSlot = {
  key: 'about.portrait',
  page: 'About',
  label: 'Founder portrait',
  src: `${GITHUB_CDN_BASE}/images/hero/2.webp`,
  alt: 'OliveHaus founder portrait',
};

const ABOUT_COLLAGE_SLOTS: SiteImageSlot[] = Array.from({ length: 5 }, (_, i) => ({
  key: `about.collage.${i + 1}`,
  page: 'About',
  label: `Photo collage — image ${i + 1}`,
  src: `${GITHUB_CDN_BASE}/images/hero/${i + 1}.webp`,
  alt: `Interior design collage image ${i + 1}`,
}));

const ABOUT_CLOSING_BG_SLOT: SiteImageSlot = {
  key: 'about.closingBg',
  page: 'About',
  label: 'Closing section background',
  src: `${GITHUB_CDN_BASE}/images/hero/7.webp`,
  alt: '',
};

const servicesMeta = [
  { alt: 'Luxury interior design showcase', label: 'Hero / showcase photo' },
  { alt: 'Modern living space', label: 'Service photo 2' },
  { alt: 'Kitchen renovation', label: 'Service photo 3' },
  { alt: 'Bathroom design', label: 'Service photo 4' },
  { alt: 'Commercial space', label: 'Service photo 5' },
];
const SERVICES_IMAGE_SLOTS: SiteImageSlot[] = servicesMeta.map((meta, i) => ({
  key: `services.image.${i + 1}`,
  page: 'Services',
  label: meta.label,
  src: `${GITHUB_CDN_BASE}/images/hero/${i + 13}.webp`,
  alt: meta.alt,
}));

const contactMeta = [
  { alt: 'Luxury living room', imageNumber: 8 },
  { alt: 'Modern office space', imageNumber: 9 },
  { alt: 'Elegant bedroom', imageNumber: 10 },
  { alt: 'Designer kitchen', imageNumber: 11 },
  { alt: 'Bathroom renovation', imageNumber: 20 },
];
const CONTACT_IMAGE_SLOTS: SiteImageSlot[] = contactMeta.map((meta, i) => ({
  key: `contact.image.${i + 1}`,
  page: 'Contact',
  label: `Gallery photo ${i + 1}`,
  src: `${GITHUB_CDN_BASE}/images/hero/${meta.imageNumber}.webp`,
  alt: meta.alt,
}));

const testimonialMeta = [
  { path: '/projects/projectlandmark/6.webp', projectType: 'Luxury Penthouse' },
  { path: '/projects/projectcasavitalis/22.webp', projectType: 'Corporate Office' },
  { path: '/projects/projectezra/2.webp', projectType: 'Private Villa' },
  { path: '/projects/projectcasaserenalekkilagos/5.webp', projectType: 'Master Suite Renovation' },
  { path: '/projects/projectofficeland/1.webp', projectType: 'Show Home Design' },
];
const TESTIMONIAL_IMAGE_SLOTS: SiteImageSlot[] = testimonialMeta.map((meta, i) => ({
  key: `testimonials.${i + 1}`,
  page: 'Testimonials',
  label: `Testimonial ${i + 1} project photo`,
  src: `${GITHUB_CDN_BASE}${meta.path}`,
  alt: `${meta.projectType} project`,
}));

export const SITE_IMAGE_SLOTS: SiteImageSlot[] = [
  ...HOME_HERO_SLOTS,
  HOME_ABOUT_TEASER_SLOT,
  HOME_CLOSING_BG_SLOT,
  ABOUT_HERO_SLOT,
  ABOUT_PORTRAIT_SLOT,
  ...ABOUT_COLLAGE_SLOTS,
  ABOUT_CLOSING_BG_SLOT,
  ...SERVICES_IMAGE_SLOTS,
  ...CONTACT_IMAGE_SLOTS,
  ...TESTIMONIAL_IMAGE_SLOTS,
];

export const SITE_IMAGE_SLOT_MAP: Map<string, SiteImageSlot> = new Map(
  SITE_IMAGE_SLOTS.map((slot) => [slot.key, slot])
);

export const SITE_IMAGE_PAGES: SiteImagePage[] = ['Home', 'About', 'Services', 'Contact', 'Testimonials'];

export {
  HOME_HERO_SLOTS,
  HOME_ABOUT_TEASER_SLOT,
  HOME_CLOSING_BG_SLOT,
  ABOUT_HERO_SLOT,
  ABOUT_PORTRAIT_SLOT,
  ABOUT_COLLAGE_SLOTS,
  ABOUT_CLOSING_BG_SLOT,
  SERVICES_IMAGE_SLOTS,
  CONTACT_IMAGE_SLOTS,
  TESTIMONIAL_IMAGE_SLOTS,
};
