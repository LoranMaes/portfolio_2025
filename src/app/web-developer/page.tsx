'use client';

import { portfolioProjects } from '@/assets/database/projects';
import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import { TransitionLink } from '@/components/TransitionLink/Index';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const technologies = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GSAP'];

const services = [
    {
        title: 'Product Websites',
        description: 'Conversion-focused marketing websites with a clear content hierarchy, polished motion, and solid accessibility foundations.',
    },
    {
        title: 'Web Applications',
        description: 'Scalable app interfaces built with reusable components, clean state architecture, and predictable data flows.',
    },
    {
        title: 'Performance Tuning',
        description: 'Audits and optimization passes that reduce bottlenecks, improve Core Web Vitals, and keep interactions snappy.',
    },
];

const process = [
    {
        title: '1. Discovery & Scope',
        detail: 'We define the audience, goals, and measurable outcomes before writing implementation tickets.',
    },
    {
        title: '2. Build & Iterate',
        detail: 'I ship in small milestones with regular checkpoints so design and engineering stay aligned.',
    },
    {
        title: '3. Launch & Support',
        detail: 'After QA and deployment, I provide handoff notes and support for post-launch refinements.',
    },
];

const principles = ['Component-first architecture', 'Type-safe code and predictable APIs', 'Responsive from mobile to desktop'];

export default function WebDeveloper() {
    const contactRef = useRef<HTMLDivElement>(null);
    const projects = portfolioProjects.filter((project) => project.discipline === 'Web Development');

    const cardClass = 'border border-foreground/10 bg-foreground/[0.03] p-6 md:p-8';
    const pillClass = 'body-small inline-flex rounded-full border border-foreground/20 px-3 py-1 uppercase tracking-[0.08em]';

    return (
        <FooterRevealLayout triggerRef={contactRef}>
            <SectionShell className="min-h-[75vh]">
                <div className="m-auto flex w-full flex-col gap-6 md:max-w-5xl">
                    <p className="body-small uppercase tracking-[0.14em] text-foreground/60">Digital Products</p>
                    <h1 className="flex h-fit flex-col">
                        <span>Web</span>
                        <span>Developer</span>
                    </h1>
                    <p className="body-large max-w-4xl text-foreground/80">
                        I design and develop modern web experiences that balance strong visual identity, maintainable code, and business impact.
                    </p>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>positioning.</h5>
                    </div>
                    <p className="body-extra-large max-w-10/12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I partner with teams that need reliable frontend execution and thoughtful UX for
                        products that need to perform in the real world.
                    </p>
                    <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
                        <div className={`${cardClass} flex w-full flex-col gap-5 md:w-2/3`}>
                            <h6>Core Toolkit</h6>
                            <div className="flex flex-wrap gap-2.5">
                                {technologies.map((tech) => (
                                    <span key={tech} className={pillClass}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={`${cardClass} flex w-full flex-col justify-between gap-4 md:w-1/3`}>
                            <h6>Primary Focus</h6>
                            <p className="body-small text-foreground/80">Fast interfaces, clear UX, and stable engineering practices from kickoff to launch.</p>
                        </div>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>services.</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <article key={service.title} className={`${cardClass} flex h-full flex-col gap-4`}>
                                <span className="body-small text-foreground/55">0{index + 1}</span>
                                <h6>{service.title}</h6>
                                <p className="body-small text-foreground/80">{service.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>selected projects.</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <TransitionLink
                                key={project.slug}
                                href={`/work/${project.slug}`}
                                className="group overflow-hidden border border-foreground/10 bg-foreground/[0.03]"
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col gap-4 p-6">
                                    <div className="flex items-center justify-between gap-3">
                                        <h6>{project.title}</h6>
                                        <span className={pillClass}>{project.client}</span>
                                    </div>
                                    <p className="body-small text-foreground/80">{project.summary}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map((item) => (
                                            <span key={item} className="body-small rounded-full border border-foreground/15 px-3 py-1 text-foreground/75">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TransitionLink>
                        ))}
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>workflow.</h5>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                        <div className="flex w-full flex-col gap-4 md:w-2/3">
                            {process.map((step) => (
                                <article key={step.title} className={`${cardClass} flex flex-col gap-2`}>
                                    <h6>{step.title}</h6>
                                    <p className="body-small text-foreground/80">{step.detail}</p>
                                </article>
                            ))}
                        </div>
                        <aside className={`${cardClass} flex w-full flex-col justify-between gap-6 md:w-1/3`}>
                            <h6>How I work</h6>
                            <ul className="flex flex-col gap-3">
                                {principles.map((principle) => (
                                    <li key={principle} className="body-small text-foreground/80">
                                        {principle}
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </div>
            </SectionShell>

            <div ref={contactRef} className="relative z-10 bg-background">
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>let&apos;s work together.</h5>
                            <Link href="/contact" className="button small primary">
                                <span className="button-small">Start a Project</span>
                            </Link>
                        </div>
                        <p className="body-large w-full text-justify lg:w-2/3">
                            Have an idea in motion or a product that needs a stronger digital presence? Let&apos;s shape it into a clean, high-performing
                            experience.
                        </p>
                    </div>
                </SectionShell>
            </div>
        </FooterRevealLayout>
    );
}
