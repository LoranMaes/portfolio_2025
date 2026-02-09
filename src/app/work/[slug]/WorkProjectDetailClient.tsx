'use client';

import type { PortfolioProject } from '@/assets/database/projects';
import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import { TransitionLink } from '@/components/TransitionLink/Index';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function WorkProjectDetailClient({
    project,
    relatedProjects,
}: {
    project: PortfolioProject;
    relatedProjects: PortfolioProject[];
}) {
    const detailsRef = useRef<HTMLDivElement>(null);

    const cardClass = 'border border-foreground/10 bg-foreground/[0.03] p-6 md:p-8';
    const pillClass = 'body-small inline-flex rounded-full border border-foreground/20 px-3 py-1 uppercase tracking-[0.08em]';

    return (
        <FooterRevealLayout triggerRef={detailsRef}>
            <SectionShell className="min-h-[75vh]">
                <div className="m-auto flex w-full flex-col gap-6 md:max-w-5xl">
                    <TransitionLink href="/work" className="body-medium w-fit text-foreground/70 transition-opacity hover:opacity-70">
                        ← Back to Work
                    </TransitionLink>
                    <p className="body-small uppercase tracking-[0.14em] text-foreground/60">Project Detail</p>
                    <h1 className="flex h-fit flex-col">
                        <span>{project.title}</span>
                    </h1>
                    <p className="body-large max-w-4xl text-foreground/80">{project.summary}</p>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={pillClass}>{project.discipline}</span>
                        <span className="body-small text-foreground/60">{project.year}</span>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-foreground/10">
                        <Image src={project.image} alt={`${project.title} preview`} fill className="object-cover" priority />
                    </div>
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>project overview.</h5>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                        <article className={`${cardClass} flex w-full flex-col gap-3 md:w-1/2`}>
                            <h6>Client</h6>
                            <p className="body-small text-foreground/80">{project.client}</p>
                        </article>
                        <article className={`${cardClass} flex w-full flex-col gap-3 md:w-1/2`}>
                            <h6>Role</h6>
                            <p className="body-small text-foreground/80">{project.role}</p>
                        </article>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>challenge and solution.</h5>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                        <article className={`${cardClass} flex w-full flex-col gap-3 md:w-1/2`}>
                            <h6>Challenge</h6>
                            <p className="body-small text-foreground/80">{project.challenge}</p>
                        </article>
                        <article className={`${cardClass} flex w-full flex-col gap-3 md:w-1/2`}>
                            <h6>Solution</h6>
                            <p className="body-small text-foreground/80">{project.solution}</p>
                        </article>
                    </div>
                </div>
            </SectionShell>

            <div ref={detailsRef} className="relative z-10 bg-background">
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>outcomes.</h5>
                        </div>
                        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                            <article className={`${cardClass} flex w-full flex-col gap-4 md:w-2/3`}>
                                <h6>Project impact</h6>
                                <ul className="flex flex-col gap-3">
                                    {project.outcomes.map((outcome) => (
                                        <li key={outcome} className="body-small text-foreground/80">
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                            <aside className={`${cardClass} flex w-full flex-col gap-4 md:w-1/3`}>
                                <h6>Stack / Channels</h6>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((item) => (
                                        <span key={item} className={pillClass}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                </SectionShell>

                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div className="flex w-full flex-col gap-3 lg:w-2/3">
                                <h5>next project.</h5>
                                <p className="body-large text-foreground/80">Need a project partner who can ship high-quality work from concept to delivery?</p>
                            </div>
                            <Link href="/contact" className="button small primary">
                                <span className="button-small">Start a Project</span>
                            </Link>
                        </div>
                        <div className={`${cardClass} flex flex-col gap-4`}>
                            <h6>Explore more projects</h6>
                            <div className="flex flex-wrap gap-2">
                                {relatedProjects.map((item) => (
                                    <TransitionLink key={item.slug} href={`/work/${item.slug}`} className={pillClass}>
                                        {item.title}
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
