'use client';

import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import { TransitionLink } from '@/components/TransitionLink/Index';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useRef } from 'react';

interface CollaborationMetric {
    label: string;
    value: string;
}

interface Collaboration {
    name: string;
    type: string;
    image: string;
    description: string;
    date: string;
    campaignGoal: string;
    role: string;
    platforms: string[];
    deliverables: string[];
    metrics: CollaborationMetric[];
    gallery: string[];
}

const collabsData: Record<string, Collaboration> = {
    winspace: {
        name: 'Winspace',
        type: 'Product Promotion',
        image: '/assets/collabs/winspace.jpg',
        description:
            'A multi-platform campaign built around race preparation and performance-focused cycling content for endurance audiences.',
        date: 'January 2024',
        campaignGoal: 'Position Winspace gear as a practical, race-ready option for amateur and competitive cyclists.',
        role: 'Creative concept, filming, editing, copywriting, and platform-specific publishing strategy.',
        platforms: ['YouTube', 'Instagram'],
        deliverables: ['1 long-form race-day integration video', '3 short-form clips for social', '5 story frames with direct product mentions'],
        metrics: [
            { label: 'Views', value: '50K+' },
            { label: 'Engagements', value: '2K+' },
            { label: 'Estimated CTR', value: '15%' },
        ],
        gallery: ['/assets/collabs/winspace-1.jpg', '/assets/collabs/winspace-2.jpg', '/assets/collabs/winspace-3.jpg'],
    },
    cerave: {
        name: 'Cérave',
        type: 'Paid TikTok Campaign',
        image: '/assets/collabs/cerave.jpg',
        description: 'A skincare-first activation focused on athlete routines before and after intense training blocks.',
        date: 'December 2023',
        campaignGoal: 'Drive awareness around daily skincare habits that fit active lifestyles and recovery routines.',
        role: 'Campaign ideation, scripting, product integration, and vertical video editing.',
        platforms: ['TikTok'],
        deliverables: ['2 branded TikTok videos', '1 educational routine format', 'Comment-thread follow-up responses'],
        metrics: [
            { label: 'Views', value: '100K+' },
            { label: 'Likes', value: '5K+' },
            { label: 'Comments', value: '500+' },
        ],
        gallery: ['/assets/collabs/cerave-1.jpg', '/assets/collabs/cerave-2.jpg'],
    },
    wowow: {
        name: 'WOWOW',
        type: 'Brand Collaboration',
        image: '/assets/collabs/wowow.jpg',
        description: 'Performance apparel integration across training and race storytelling content formats.',
        date: 'November 2023',
        campaignGoal: 'Show product utility in high-output sessions while keeping the story athlete-led and authentic.',
        role: 'Content planning, production, motion edits, and distribution across active channels.',
        platforms: ['YouTube', 'Instagram'],
        deliverables: ['1 YouTube integration segment', '2 short-form vertical edits', '1 recap carousel post'],
        metrics: [
            { label: 'Views', value: '40K+' },
            { label: 'Engagements', value: '1.5K+' },
        ],
        gallery: ['/assets/collabs/wowow-1.jpg', '/assets/collabs/wowow-2.jpg'],
    },
    sumarpo: {
        name: 'Sumarpo',
        type: 'Brand Collaboration',
        image: '/assets/collabs/sumarpo.jpg',
        description: 'Triathlon-focused content centered on swim training and wetsuit performance in race conditions.',
        date: 'October 2023',
        campaignGoal: 'Increase trust in product performance through practical use cases during real training cycles.',
        role: 'End-to-end execution from location planning through editing and publishing cadence.',
        platforms: ['YouTube', 'Instagram', 'TikTok'],
        deliverables: ['1 training-day feature video', '3 cross-platform short edits', '1 pre-race checklist style post'],
        metrics: [
            { label: 'Views', value: '60K+' },
            { label: 'Engagements', value: '3K+' },
        ],
        gallery: ['/assets/collabs/sumarpo-1.jpg', '/assets/collabs/sumarpo-2.jpg', '/assets/collabs/sumarpo-3.jpg'],
    },
    'the-feed': {
        name: 'The Feed',
        type: 'Brand Collaboration',
        image: '/assets/collabs/the-feed.jpg',
        description: 'Sports nutrition storytelling focused on fueling strategies for long-distance training and racing.',
        date: 'September 2023',
        campaignGoal: 'Educate endurance athletes on when and how to fuel without disrupting performance.',
        role: 'Narrative direction, content creation, edit packaging, and reporting handoff.',
        platforms: ['YouTube', 'Instagram'],
        deliverables: ['1 long-form educational segment', '2 short-form nutrition explainers', '1 workout fueling visual guide'],
        metrics: [
            { label: 'Views', value: '35K+' },
            { label: 'Engagements', value: '2K+' },
        ],
        gallery: ['/assets/collabs/the-feed-1.jpg', '/assets/collabs/the-feed-2.jpg'],
    },
    siroko: {
        name: 'Siroko',
        type: 'Brand Collaboration',
        image: '/assets/collabs/siroko.jpg',
        description: 'Cycling eyewear partnership showcasing comfort, fit, and visibility in everyday training conditions.',
        date: 'August 2023',
        campaignGoal: 'Build product recall through practical wear-testing in both race and casual training contexts.',
        role: 'Creative direction, shooting, post-production, and launch sequencing.',
        platforms: ['YouTube', 'Instagram', 'TikTok'],
        deliverables: ['1 comparison-style review video', '3 vertical highlight edits', '1 product-focused photo set'],
        metrics: [
            { label: 'Views', value: '45K+' },
            { label: 'Engagements', value: '2.5K+' },
        ],
        gallery: ['/assets/collabs/siroko-1.jpg', '/assets/collabs/siroko-2.jpg', '/assets/collabs/siroko-3.jpg'],
    },
};

export default function CollaborationDetailClient({ slug }: { slug: string }) {
    const detailsRef = useRef<HTMLDivElement>(null);
    const collab = collabsData[slug];

    if (!collab) {
        notFound();
    }

    const cardClass = 'border border-foreground/10 bg-foreground/[0.03] p-6 md:p-8';
    const pillClass = 'body-small inline-flex rounded-full border border-foreground/20 px-3 py-1 uppercase tracking-[0.08em]';

    const relatedCollabs = Object.entries(collabsData)
        .filter(([key]) => key !== slug)
        .slice(0, 3)
        .map(([key, value]) => ({ key, name: value.name }));

    const gallery = collab.gallery.length > 0 ? collab.gallery : [collab.image];

    return (
        <FooterRevealLayout triggerRef={detailsRef}>
            <SectionShell className="min-h-[75vh]">
                <div className="m-auto flex w-full flex-col gap-6 md:max-w-5xl">
                    <TransitionLink href="/content-creation" className="body-medium w-fit text-foreground/70 transition-opacity hover:opacity-70">
                        ← Back to Collaborations
                    </TransitionLink>
                    <p className="body-small uppercase tracking-[0.14em] text-foreground/60">Campaign Detail</p>
                    <h1 className="flex h-fit flex-col">
                        <span>{collab.name}</span>
                    </h1>
                    <p className="body-large max-w-4xl text-foreground/80">{collab.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={pillClass}>{collab.type}</span>
                        <span className="body-small text-foreground/60">{collab.date}</span>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-foreground/10">
                        <Image src={collab.image} alt={`${collab.name} campaign cover`} fill className="object-cover" priority />
                    </div>
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>campaign overview.</h5>
                    </div>
                    <p className="body-extra-large max-w-10/12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each activation is built around authentic performance storytelling while staying
                        aligned with measurable campaign goals.
                    </p>
                    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                        <article className={`${cardClass} flex w-full flex-col gap-3 md:w-1/2`}>
                            <h6>Campaign Goal</h6>
                            <p className="body-small text-foreground/80">{collab.campaignGoal}</p>
                        </article>
                        <article className={`${cardClass} flex w-full flex-col gap-3 md:w-1/2`}>
                            <h6>My Role</h6>
                            <p className="body-small text-foreground/80">{collab.role}</p>
                        </article>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>deliverables.</h5>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                        <article className={`${cardClass} flex w-full flex-col gap-4 md:w-2/3`}>
                            <h6>What was delivered</h6>
                            <ul className="flex flex-col gap-3">
                                {collab.deliverables.map((item) => (
                                    <li key={item} className="body-small text-foreground/80">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </article>
                        <aside className={`${cardClass} flex w-full flex-col gap-4 md:w-1/3`}>
                            <h6>Platforms</h6>
                            <div className="flex flex-wrap gap-2">
                                {collab.platforms.map((platform) => (
                                    <span key={platform} className={pillClass}>
                                        {platform}
                                    </span>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>impact.</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {collab.metrics.map((metric) => (
                            <article key={metric.label} className={`${cardClass} flex flex-col gap-3`}>
                                <h6>{metric.label}</h6>
                                <p className="quote text-foreground">{metric.value}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </SectionShell>

            <div ref={detailsRef} className="relative z-10 bg-background">
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>campaign gallery.</h5>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {gallery.map((image, index) => (
                                <div key={image + index} className="relative aspect-[4/3] w-full overflow-hidden border border-foreground/10">
                                    <Image src={image} alt={`${collab.name} campaign visual ${index + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionShell>

                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div className="flex w-full flex-col gap-3 lg:w-2/3">
                                <h5>next campaign.</h5>
                                <p className="body-large text-foreground/80">Looking for a campaign with clear deliverables and measurable outcomes?</p>
                            </div>
                            <Link href="/contact" className="button small primary">
                                <span className="button-small">Start a Collaboration</span>
                            </Link>
                        </div>
                        <div className={`${cardClass} flex flex-col gap-4`}>
                            <h6>More collaborations</h6>
                            <div className="flex flex-wrap gap-2">
                                {relatedCollabs.map((item) => (
                                    <TransitionLink key={item.key} href={`/content-creation/${item.key}`} className={pillClass}>
                                        {item.name}
                                    </TransitionLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </SectionShell>
            </div>
        </FooterRevealLayout>
    );
}
