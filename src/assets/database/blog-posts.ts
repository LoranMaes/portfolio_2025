export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readTime: string;
    coverImage: string;
    keyTakeaways: string[];
    content: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'building-portfolio-cases-that-convert',
        title: 'Building Portfolio Case Studies That Actually Convert',
        excerpt: 'A practical structure for turning nice visuals into project stories that win trust and client conversations.',
        category: 'Web Development',
        publishedAt: 'February 2, 2026',
        readTime: '6 min read',
        coverImage: '/assets/work/stone-mind.jpg',
        keyTakeaways: ['Lead with problem context before visuals', 'Document decisions, not only outcomes', 'Show constraints and tradeoffs clearly'],
        content: [
            'Most portfolios fail because they only show outputs. Clients, founders, and hiring teams usually need to understand how you think, where you add value, and what decisions you can defend under constraints.',
            'A strong case study starts with context: who the project was for, what had to improve, and what constraints shaped implementation. This gives every visual and code decision a clear reason to exist.',
            'When I write project pages, I use a repeatable sequence: challenge, approach, system decisions, outcome. The goal is to make the reader feel the logic of the process, not just the polish of the final UI.',
            'If you want better conversion from portfolio traffic, document the work as a problem-solving narrative. In practice, this means fewer generic claims and more evidence-backed decisions.',
        ],
    },
    {
        slug: 'nextjs-performance-checklist-for-client-work',
        title: 'A Next.js Performance Checklist I Use For Client Projects',
        excerpt: 'The exact checks I run before launch to keep websites fast on real devices and unstable networks.',
        category: 'Web Development',
        publishedAt: 'January 19, 2026',
        readTime: '8 min read',
        coverImage: '/assets/work/violet-orbit.jpg',
        keyTakeaways: ['Audit Core Web Vitals by template', 'Prioritize image loading strategy early', 'Set performance budgets per page type'],
        content: [
            'Performance is easiest to fix before features pile up. I start each project by setting page-type budgets for LCP, CLS, and interaction responsiveness, then I track regressions during implementation.',
            'The biggest wins are usually structural: controlling image dimensions, avoiding layout shifts, reducing blocking scripts, and splitting heavy UI logic from initial render paths.',
            'For client websites, speed is rarely just technical polish. It affects conversion rates, crawl efficiency, and perceived quality. That is why every release should include a repeatable performance pass.',
            'A checklist is valuable only when it is connected to real templates. Build one per project and keep it in the repo so design and engineering can align around measurable tradeoffs.',
        ],
    },
    {
        slug: 'content-systems-for-consistent-social-output',
        title: 'Designing a Content System for Consistent Social Output',
        excerpt: 'How I turn one filming day into multiple publish-ready assets without losing quality or narrative clarity.',
        category: 'Content Creation',
        publishedAt: 'January 8, 2026',
        readTime: '5 min read',
        coverImage: '/assets/home-loran-full.jpg',
        keyTakeaways: ['Capture with edit intent', 'Build a shot taxonomy by platform', 'Batch post-production in themed blocks'],
        content: [
            'Content consistency is not only discipline. It is systems design. The goal is to reduce daily decision fatigue by building repeatable structures for ideation, capture, editing, and publishing.',
            'I map each shoot to multiple outputs before filming starts. Long-form narrative clips, short hooks, and story fragments all need different pacing, so the shot list should reflect that from the beginning.',
            'Post-production becomes easier when edits are grouped by intent: educational clips, personality-led moments, product-focused integrations. This keeps tone consistent and speeds up approvals.',
            'A good content system does not remove creativity. It protects it by handling the operational side so you can focus on story quality and audience relevance.',
        ],
    },
    {
        slug: 'what-brands-look-for-in-creator-partnerships',
        title: 'What Brands Actually Look For In Creator Partnerships',
        excerpt: 'Beyond follower counts: the signals that make creator proposals feel low-risk and high-value for campaigns.',
        category: 'Content Creation',
        publishedAt: 'December 14, 2025',
        readTime: '7 min read',
        coverImage: '/assets/about-loran-full.jpg',
        keyTakeaways: ['Clarity of audience fit matters most', 'Deliverables must map to goals', 'Reporting structure builds trust'],
        content: [
            'Most strong creator partnerships are built on reliability and strategic clarity, not vanity metrics. Brands want evidence that your audience, storytelling style, and delivery process fit their goals.',
            'When pitching, define deliverables in campaign language: what assets, for which channel, with what intent. This removes ambiguity and shortens decision cycles.',
            'Reporting is often overlooked. Even lightweight post-campaign summaries create confidence and make repeat collaborations more likely.',
            'Treat partnerships like product work: clear brief, clear output, clear measurement. This approach differentiates creators who can scale with brand teams.',
        ],
    },
];

export function getBlogPostBySlug(slug: string) {
    return blogPosts.find((post) => post.slug === slug);
}
