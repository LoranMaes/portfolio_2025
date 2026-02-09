export type ProjectDiscipline = 'Web Development' | 'Content Creation';

export interface PortfolioProject {
    slug: string;
    title: string;
    discipline: ProjectDiscipline;
    image: string;
    summary: string;
    year: string;
    client: string;
    role: string;
    stack: string[];
    challenge: string;
    solution: string;
    outcomes: string[];
}

export const portfolioProjects: PortfolioProject[] = [
    {
        slug: 'stone-mind',
        title: 'Stone Mind',
        discipline: 'Web Development',
        image: '/assets/work/stone-mind.jpg',
        summary: 'Marketing website and onboarding flow for a mental wellness platform focused on conversion and trust.',
        year: '2025',
        client: 'Stone Mind',
        role: 'Product web design and frontend development',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
        challenge: 'The brand needed a calm but persuasive digital presence that could explain value quickly while remaining lightweight on mobile.',
        solution: 'I built a component-driven website with clear conversion paths, intentional motion, and simplified content architecture per audience stage.',
        outcomes: ['Improved onboarding clarity across key landing pages', 'Consistent UI system for future campaign pages', 'Fast first-load experience on mobile'],
    },
    {
        slug: 'violet-orbit',
        title: 'Violet Orbit',
        discipline: 'Web Development',
        image: '/assets/work/violet-orbit.jpg',
        summary: 'E-commerce concept focused on storytelling-first merchandising and smooth category navigation.',
        year: '2024',
        client: 'Violet Orbit',
        role: 'Frontend architecture and design implementation',
        stack: ['React', 'Next.js', 'Performance Optimization'],
        challenge: 'The storefront needed to showcase brand identity while still making product discovery and purchase intent frictionless.',
        solution: 'I implemented reusable merchandising modules, improved browse flows, and tuned rendering strategy to keep pages responsive.',
        outcomes: ['Clearer product discovery patterns', 'Reusable modules for campaigns and launches', 'Reduced interaction latency across key views'],
    },
    {
        slug: 'visual-screen-models',
        title: 'Visual Screen Models',
        discipline: 'Web Development',
        image: '/assets/work/visual-screen-models.jpg',
        summary: 'Portfolio platform for a modeling agency with strong visual rhythm and talent-first discoverability.',
        year: '2024',
        client: 'Visual Screen Models',
        role: 'UX strategy, UI build, responsive frontend',
        stack: ['Next.js', 'Responsive UI', 'Accessibility'],
        challenge: 'The agency needed a premium visual experience without slowing down load times or making profile navigation heavy.',
        solution: 'I designed a scalable listing and profile system with clear hierarchy, lazy-loaded media, and mobile-first structure.',
        outcomes: ['Better talent visibility through improved information hierarchy', 'Consistent cross-device browsing experience', 'Cleaner content updates through structured components'],
    },
    {
        slug: 'endurance-season-recap',
        title: 'Endurance Season Recap',
        discipline: 'Content Creation',
        image: '/assets/home-loran-full.jpg',
        summary: 'Multi-platform story package documenting a full race season with training insights and sponsor integrations.',
        year: '2025',
        client: 'Personal Brand / Partner Brands',
        role: 'Creative direction, filming, editing, publishing',
        stack: ['YouTube', 'Instagram Reels', 'TikTok'],
        challenge: 'Long-format storytelling had to be translated into short, platform-native clips without losing narrative coherence.',
        solution: 'I built a modular content pipeline that generated long-form episodes plus short-form derivatives from the same footage set.',
        outcomes: ['Consistent posting cadence across platforms', 'Higher retention on short recap clips', 'Clear sponsor integration moments without breaking story flow'],
    },
    {
        slug: 'winspace-creator-campaign',
        title: 'Winspace Creator Campaign',
        discipline: 'Content Creation',
        image: '/assets/about-loran-full.jpg',
        summary: 'Creator campaign for cycling gear featuring real race-day testing, practical feedback, and cross-channel cutdowns.',
        year: '2025',
        client: 'Winspace',
        role: 'Campaign concept, production, post-production, reporting',
        stack: ['YouTube Integrations', 'Short-form Social', 'Campaign Reporting'],
        challenge: 'The campaign needed to balance authentic athlete perspective with product messaging and measurable outcomes.',
        solution: 'I structured deliverables by audience intent: detailed integration for high-intent viewers and short hooks for reach channels.',
        outcomes: ['Strong product recall in campaign comments', 'Improved reach from short-form cutdowns', 'Reusable content assets for later campaign waves'],
    },
];

export const featuredHomeProjectSlugs = ['stone-mind', 'endurance-season-recap', 'violet-orbit', 'winspace-creator-campaign'];

export function getProjectBySlug(slug: string) {
    return portfolioProjects.find((project) => project.slug === slug);
}
