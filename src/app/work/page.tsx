'use client';

import { portfolioProjects } from '@/assets/database/projects';
import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import WorkItem from '@/components/WorkItem';
import { useRef } from 'react';

export default function WorkIndexPage() {
    const workRef = useRef<HTMLDivElement>(null);

    const webProjects = portfolioProjects.filter((project) => project.discipline === 'Web Development');
    const contentProjects = portfolioProjects.filter((project) => project.discipline === 'Content Creation');

    return (
        <FooterRevealLayout triggerRef={workRef}>
            <SectionShell className="min-h-[75vh]">
                <div className="m-auto flex w-full flex-col gap-6 md:max-w-5xl">
                    <p className="body-small uppercase tracking-[0.14em] text-foreground/60">Portfolio Projects</p>
                    <h1 className="flex h-fit flex-col">
                        <span>Selected</span>
                        <span>Work</span>
                    </h1>
                    <p className="body-large max-w-4xl text-foreground/80">
                        A mix of web development and content creation projects, each built with measurable goals and clear creative direction.
                    </p>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>web development.</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {webProjects.map((project) => (
                            <WorkItem
                                key={project.slug}
                                title={project.title}
                                description={project.summary}
                                image={project.image}
                                href={`/work/${project.slug}`}
                                discipline={project.discipline}
                            />
                        ))}
                    </div>
                </div>
            </SectionShell>

            <div ref={workRef} className="relative z-10 bg-background">
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>content creation.</h5>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {contentProjects.map((project) => (
                                <WorkItem
                                    key={project.slug}
                                    title={project.title}
                                    description={project.summary}
                                    image={project.image}
                                    href={`/work/${project.slug}`}
                                    discipline={project.discipline}
                                />
                            ))}
                        </div>
                    </div>
                </SectionShell>
            </div>
        </FooterRevealLayout>
    );
}
