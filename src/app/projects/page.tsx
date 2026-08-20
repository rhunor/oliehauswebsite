// src/app/projects/page.tsx
import connectDB from '@/lib/mongodb';
import DynamicProject from '@/models/DynamicProject';
import { getGitHubCdnCacheBustedUrl, createImageArray } from '@/lib/utils';
import ClientProjectsPage from './ClientProjectsPage';

// Always render fresh from the database at request time — this page must
// never be statically frozen at build time, which also means `next build`
// no longer needs a live DB connection to succeed (see project detail page).
export const dynamic = 'force-dynamic';

// const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  category: 'residential' | 'corporate' | 'commercial';
  thumbnail: ProjectImage;
  images: ProjectImage[];
  featured?: boolean;
  area?: string;
}

// Type for the lean() result from Mongoose to avoid 'any'
interface LeanDynamicProject {
  _id: string; // ObjectId becomes string after .lean()
  title: string;
  shortDescription: string;
  category: string;
  location?: string;
  featuredImage: string;
  images: string[];
  isFeatured: boolean;
}

export default async function ProjectsPage() {
  await connectDB();

  const dynamicRaw = await DynamicProject.find({ isPublished: true })
    .sort({ order: 1, createdAt: -1 })
    .select('title shortDescription category location featuredImage images isFeatured')
    .lean<LeanDynamicProject[]>();

  const dynamicProjects: Project[] = dynamicRaw.map((p) => ({
    id: p._id.toString(),
    title: p.title,
    location: p.location || 'Lagos, Nigeria',
    description: p.shortDescription,
    category: p.category as 'residential' | 'corporate' | 'commercial',
    thumbnail: {
      src: p.featuredImage,
      alt: `${p.title} thumbnail`,
    },
    images: p.images.map((src: string, i: number) => ({
      src,
      alt: `${p.title} image ${i + 1}`,
    })),
    featured: p.isFeatured,
  }));

  // Static GitHub-hosted projects
  const staticProjects: Project[] = [
    {
      id: 'nicon',
      title: 'Project Nicon',
      location: 'Victoria Island, Lagos',
      description: 'This master’s bedroom lounge has been thoughtfully renovated to create a modern, sophisticated retreat. The space seamlessly combines a bedroom, study, closet, and bathroom, designed for both comfort and functionality. Ample compartments and storage solutions have been incorporated to accommodate an extensive wardrobe, keeping the area organized and clutter-free. Clean lines, contemporary finishes, and a cohesive design aesthetic make this space a perfect blend of elegance and practicality—ideal for relaxation, work, and dressing in style.',
      category: 'residential',
      featured: true,
      area: '350 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectnicon/24.webp', 'moderate'),
        alt: 'Project Nicon luxury residence',
      },
      images: createImageArray('/projects/projectnicon', 29, 'Project Nicon interior'),
    },
    {
      id: 'Edené',
      title: 'Project Edené wellness',
      location: 'Magodo, Lagos',
      description: 'This renovation reimagined the spa into a sanctuary of calm, where muted tones, refined textures, and seamless design invite relaxation at every turn.',
      category: 'commercial',
      area: '185 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectsereniquemagodolagos_/5.webp', 'moderate'),
        alt: 'Project Edené spa interior',
      },
      images: createImageArray('/projects/projectsereniquemagodolagos_', 9, 'Project Serenique interior'),
    },
    {
      id: 'landmark',
      title: 'Project Landmark',
      location: 'Oniru, Lagos',
      description: 'This space captures the spirit of Paris vibrant, romantic, and effortlessly chic. Playful details meet refined finishes, blending whimsy with sophistication. Bold yet graceful',
      category: 'residential',
      area: '240 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectlandmark/1.webp', 'moderate'),
        alt: 'Project Landmark interior',
      },
      images: createImageArray('/projects/projectlandmark', 10, 'Project Landmark interior'),
    },
    {
      id: 'serene',
      title: 'Project Serene',
      location: 'Maryland, Lagos',
      description: 'Designed as a sanctuary, this bathroom embraces space, light, and calm. A breathy layout, soft finishes, and spa-inspired details create an atmosphere of ease and renewal',
      category: 'residential',
      area: '45 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectserene/1.webp', 'moderate'),
        alt: 'Project Serenique spa interior',
      },
      images: createImageArray('/projects/projectserene', 4, 'Project serene interior'),
    },
    {
      id: 'ezra',
      title: 'Project Ezra',
      location: 'Lekki, Lagos',
      description: 'Defined by clean lines, open flow, and thoughtful details, this modern space blends functionality with understated elegance.',
      category: 'residential',
      area: '195 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectezra/4.webp', 'moderate'),
        alt: 'Project Ezra modern interior',
      },
      images: createImageArray('/projects/projectezra', 6, 'Project Ezra interior'),
    },
    {
      id: 'Keffi',
      title: 'Project Keffi',
      location: 'ikoyi, Lagos',
      description: 'This home embodies modern luxury with personality — blending bold, saturated hues with serene spaces designed for rest and renewal.',
      category: 'residential',
      featured: true,
      area: '310 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectluminalekkilagos/1.webp', 'moderate'),
        alt: 'Project Keffi luxury home',
      },
      images: createImageArray('/projects/projectluminalekkilagos', 6, 'Project Keffi interior'),
    },
    {
      id: 'casa-vitalis',
      title: 'Project Casa Vitalis',
      location: 'Lekki, Lagos',
      description: 'This home strikes a rare balance between bold expression and refined luxury. Rich statement hues set a dramatic tone.',
      category: 'residential',
      area: '425 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectcasavitalis/2.webp', 'moderate'),
        alt: 'Project Casa Vitalis luxury residence',
      },
      images: createImageArray('/projects/projectcasavitalis', 25, 'Project Casa Vitalis interior'),
    },
    {
      id: 'casa-serena',
      title: 'Project Casa Serena',
      location: 'Lekki, Lagos',
      description: 'A stylish home with a modern edge, Casa Serena combines clean lines, contemporary finishes, and subtle warmth.',
      category: 'residential',
      area: '280 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectcasaserenalekkilagos/1.webp', 'moderate'),
        alt: 'Project Casa Serena modern home',
      },
      images: createImageArray('/projects/projectcasaserenalekkilagos', 8, 'Project Casa Serena interior'),
    },
    {
      id: 'horizon',
      title: 'Project Horizon',
      location: 'Lekki, Lagos',
      description: 'This kitchen balances refined aesthetics with everyday function, blending seamless storage and elegant finishes.',
      category: 'residential',
      featured: true,
      area: '65 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projecthorizonlekkilagos/1.webp', 'moderate'),
        alt: 'Project Horizon kitchen design',
      },
      images: createImageArray('/projects/projecthorizonlekkilagos', 4, 'Project Horizon interior'),
    },
    {
      id: 'modern-nest',
      title: 'Project Modern Nest',
      location: 'Ikeja, Lagos',
      description: 'This project brought together a soft nursery, cozy living room, warm dining space, and modern bedroom.',
      category: 'residential',
      area: '220 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectmodernnestomolelagos/1.webp', 'moderate'),
        alt: 'Project Modern Nest family home',
      },
      images: createImageArray('/projects/projectmodernnestomolelagos', 3, 'Project Modern Nest interior'),
    },
    {
      id: 'aiona',
      title: 'Project Aiona',
      location: 'Lekki, Lagos',
      description: `The client asked for a gender-neutral nail salon and aesthetic clinic with a "New York meets Chelsea" vibe. The result is a refined, modern space that blends raw texture with quiet sophistication — exposed brick, muted tones, and sculptural forms. Warm lighting and clean lines create balance, while a mix of soft seating and strong materials keeps the atmosphere calm, confident, and inclusive.`,
      category: 'commercial',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectaiona/10.webp', 'moderate'),
        alt: 'Project Aiona salon and clinic interior',
      },
      images: createImageArray('/projects/projectaiona', 15, 'Project Aiona interior'),
    },
    {
      id: 'gerald',
      title: 'Project Gerald',
      location: 'Lekki, Lagos',
      description: 'A serene retreat designed with balance in mind — this bathroom combines clean lines and elegant finishes.',
      category: 'residential',
      area: '38 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectgeraldlekkilagos/2.webp', 'moderate'),
        alt: 'Project Gerald bathroom design',
      },
      images: createImageArray('/projects/projectgeraldlekkilagos', 2, 'Project Gerald interior'),
    },
    {
      id: 'lustre',
      title: 'Project Lustre',
      location: 'Victoria Island, Lagos',
      description: 'This kitchen was designed to be both beautiful and practical — a cozy space where storage and style work hand in hand.',
      category: 'residential',
      area: '52 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectlustre/7.webp', 'moderate'),
        alt: 'Project Lustre kitchen',
      },
      images: createImageArray('/projects/projectlustre', 10, 'Project Lustre interior'),
    },
    {
      id: 'blush',
      title: 'Project Blush',
      location: 'GRA, Lagos',
      description: 'This bathroom balances softness with personality, blending soothing finishes with a touch of bold colour.',
      category: 'residential',
      area: '42 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectblushgralagos_/2.webp', 'moderate'),
        alt: 'Project Blush bathroom',
      },
      images: createImageArray('/projects/projectblushgralagos_', 5, 'Project Blush interior'),
    },
    {
      id: 'haven',
      title: 'Project Haven',
      location: 'Lekki, Lagos',
      description: 'This shortlet was designed for comfort and ease — a refreshing retreat with warm finishes and thoughtful layouts.',
      category: 'commercial',
      area: '145 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projecthavenlekkilagos/1.webp', 'moderate'),
        alt: 'Project Haven shortlet',
      },
      images: createImageArray('/projects/projecthavenlekkilagos', 4, 'Project Haven interior'),
    },
    {
      id: 'urban',
      title: 'Project Urban',
      location: 'Lekki, Lagos',
      description: 'This project redefined the home with an urban edge and upscale sophistication.',
      category: 'residential',
      area: '268 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projecturbanlekkilagos/10.webp', 'moderate'),
        alt: 'Project Urban modern home',
      },
      images: createImageArray('/projects/projecturbanlekkilagos', 9, 'Project Urban interior'),
    },
    {
      id: 'roche',
      title: 'Project Roche',
      location: 'Banana Island, Lagos',
      description: 'This renovation was designed around our client\'s love for warmth and vibrance.',
      category: 'residential',
      featured: true,
      area: '520 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectroche/1.webp', 'moderate'),
        alt: 'Project Roche luxury renovation',
      },
      images: createImageArray('/projects/projectroche', 20, 'Project Roche interior'),
    },
    {
      id: 'holiday',
      title: 'Project Holiday',
      location: 'Lekki, Lagos',
      description: 'This high-end renovation reshaped the home into a modern sanctuary with thoughtful layouts.',
      category: 'residential',
      area: '385 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectholiday/22.webp', 'moderate'),
        alt: 'Project Holiday renovation',
      },
      images: createImageArray('/projects/projectholiday', 22, 'Project Holiday interior'),
    },
    {
      id: 'tranquil',
      title: 'Project Tranquil',
      location: 'Magodo, Lagos',
      description: 'This project transformed everyday bathrooms into serene, spa-inspired retreats filled with colour and character.',
      category: 'residential',
      area: '85 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projecttranquilmagodolagos_/2.webp', 'moderate'),
        alt: 'Project Tranquil spa bathrooms',
      },
      images: createImageArray('/projects/projecttranquilmagodolagos_', 13, 'Project Tranquil interior'),
    },
    {
      id: 'london',
      title: 'Project Osapa London',
      location: 'Lekki, Lagos',
      description: 'A complete transformation of this residence into a refined, high-end home with bespoke details.',
      category: 'residential',
      area: '445 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectlondon/20.webp', 'moderate'),
        alt: 'Project London luxury residence',
      },
      images: createImageArray('/projects/projectlondon', 23, 'ProjectLondon interior'),
    },
    {
      id: 'officeland',
      title: 'Project Officeland',
      location: 'Ikoyi, Lagos',
      description: 'We designed this workplace to balance functionality with impact — creating a space that supports both staff well-being and productivity.',
      category: 'corporate',
      featured: true,
      area: '650 m²',
      thumbnail: {
        src: getGitHubCdnCacheBustedUrl('/projects/projectofficeland/6.webp', 'moderate'),
        alt: 'Project Officeland corporate workspace',
      },
      images: createImageArray('/projects/projectofficeland', 9, 'Project Officeland interior'),
    },
  ];

  // Dynamic projects FIRST (newly uploaded at the top)
  const allProjects = [...dynamicProjects, ...staticProjects];

  return <ClientProjectsPage initialProjects={allProjects} />;
}