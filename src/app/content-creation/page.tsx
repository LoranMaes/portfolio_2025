'use client';

import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import { TransitionLink } from '@/components/TransitionLink/Index';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const platforms = [
    {
        name: 'YouTube',
        format: 'Long-form',
        description: 'Weekly vlogs and race-day stories focused on triathlon, running, and cycling.',
        url: 'https://youtube.com/@yourusername',
    },
    {
        name: 'TikTok',
        format: 'Short-form',
        description: 'Quick training tips, gear insights, and behind-the-scenes snapshots from events.',
        url: 'https://tiktok.com/@yourusername',
    },
    {
        name: 'Instagram',
        format: 'Short-form',
        description: 'Visual storytelling around performance, lifestyle, and consistent athlete habits.',
        url: 'https://instagram.com/yourusername',
    },
];

const pillars = ['Triathlon race coverage', 'Endurance training routines', 'Running and cycling events', 'Lifestyle and recovery habits'];

const collaborationFlow = [
    {
        title: '1. Creative Direction',
        detail: 'We align on objective, key message, and tone before production starts.',
    },
    {
        title: '2. Production & Publishing',
        detail: 'I produce platform-specific content with a format that fits your campaign goals.',
    },
    {
        title: '3. Reporting & Optimization',
        detail: 'You receive performance insights and recommendations for future activations.',
    },
];

const brandCollabs = [
    {
        name: 'Winspace',
        type: 'Promotion',
        image: '/assets/collabs/winspace.jpg',
        slug: 'winspace',
    },
    {
        name: 'Cérave',
        type: 'Paid TikTok',
        image: '/assets/collabs/cerave.jpg',
        slug: 'cerave',
    },
    {
        name: 'WOWOW',
        type: 'Collaboration',
        image: '/assets/collabs/wowow.jpg',
        slug: 'wowow',
    },
    {
        name: 'Sumarpo',
        type: 'Collaboration',
        image: '/assets/collabs/sumarpo.jpg',
        slug: 'sumarpo',
    },
    {
        name: 'The Feed',
        type: 'Collaboration',
        image: '/assets/collabs/the-feed.jpg',
        slug: 'the-feed',
    },
    {
        name: 'Siroko',
        type: 'Collaboration',
        image: '/assets/collabs/siroko.jpg',
        slug: 'siroko',
    },
];

export default function ContentCreation() {
    const collabsRef = useRef<HTMLDivElement>(null);

    const cardClass = 'border border-foreground/10 bg-foreground/[0.03] p-6 md:p-8';
    const pillClass = 'body-small inline-flex rounded-full border border-foreground/20 px-3 py-1 uppercase tracking-[0.08em]';

    return (
        <FooterRevealLayout triggerRef={collabsRef}>
            <SectionShell className="min-h-[75vh]">
                <div className="m-auto flex w-full flex-col gap-6 md:max-w-5xl">
                    <p className="body-small uppercase tracking-[0.14em] text-foreground/60">Sports Storytelling</p>
                    <h1 className="flex h-fit flex-col">
                        <span>Content</span>
                        <span>Creator</span>
                    </h1>
                    <p className="body-large max-w-4xl text-foreground/80">
                        I create performance-driven content for endurance audiences and brands that want authentic, high-retention storytelling.
                    </p>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>positioning.</h5>
                        <a href="/assets/media-kit.pdf" download className="button small primary">
                            <span className="button-small">Download Media Kit</span>
                        </a>
                    </div>
                    <p className="body-extra-large max-w-10/12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I translate endurance sport experiences into platform-native narratives that
                        build trust, attention, and measurable brand relevance.
                    </p>
                    <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
                        <div className={`${cardClass} flex w-full flex-col gap-5 md:w-2/3`}>
                            <h6>Content Pillars</h6>
                            <div className="flex flex-wrap gap-2.5">
                                {pillars.map((pillar) => (
                                    <span key={pillar} className={pillClass}>
                                        {pillar}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={`${cardClass} flex w-full flex-col justify-between gap-4 md:w-1/3`}>
                            <h6>Audience Fit</h6>
                            <p className="body-small text-foreground/80">
                                Athletes and active lifestyle audiences looking for practical insights, honest reviews, and training motivation.
                            </p>
                        </div>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>channels.</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {platforms.map((platform, index) => (
                            <a
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${cardClass} group flex h-full flex-col gap-4 transition-colors duration-200 hover:bg-foreground/[0.06]`}
                            >
                                <span className="body-small text-foreground/55">0{index + 1}</span>
                                <div className="flex items-center justify-between gap-4">
                                    <h6>{platform.name}</h6>
                                    <span className={pillClass}>{platform.format}</span>
                                </div>
                                <p className="body-small text-foreground/80">{platform.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>collaboration flow.</h5>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                        <div className="flex w-full flex-col gap-4 md:w-2/3">
                            {collaborationFlow.map((step) => (
                                <article key={step.title} className={`${cardClass} flex flex-col gap-2`}>
                                    <h6>{step.title}</h6>
                                    <p className="body-small text-foreground/80">{step.detail}</p>
                                </article>
                            ))}
                        </div>
                        <aside className={`${cardClass} flex w-full flex-col justify-between gap-6 md:w-1/3`}>
                            <h6>Partnership Scope</h6>
                            <ul className="flex flex-col gap-3">
                                <li className="body-small text-foreground/80">Single-platform activations</li>
                                <li className="body-small text-foreground/80">Cross-platform content bundles</li>
                                <li className="body-small text-foreground/80">Event and launch campaigns</li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </SectionShell>

            <div ref={collabsRef} className="relative z-10 bg-background">
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>selected brand work.</h5>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {brandCollabs.map((brand) => (
                                <TransitionLink
                                    key={brand.slug}
                                    href={`/content-creation/${brand.slug}`}
                                    className="group overflow-hidden border border-foreground/10 bg-foreground/[0.03] transition-colors duration-200 hover:bg-foreground/[0.06]"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                                        <Image
                                            src={brand.image}
                                            alt={`${brand.name} collaboration`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-4 p-6">
                                        <h6>{brand.name}</h6>
                                        <span className={pillClass}>{brand.type}</span>
                                    </div>
                                </TransitionLink>
                            ))}
                        </div>
                    </div>
                </SectionShell>

                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>let&apos;s collaborate.</h5>
                            <Link href="/contact" className="button small primary">
                                <span className="button-small">Start a Campaign</span>
                            </Link>
                        </div>
                        <p className="body-large w-full text-justify lg:w-2/3">
                            If you&apos;re looking for a creator who can connect product stories with endurance communities, I&apos;d be happy to discuss a
                            campaign.
                        </p>
                    </div>
                </SectionShell>
            </div>
        </FooterRevealLayout>
    );
}
