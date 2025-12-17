'use client';
import Footer from '@/components/Footer/Index';
import SectionShell from '@/components/SectionShell/Index';
import WorkItem from '@/components/WorkItem';
import { useNav } from '@/Contexts/NavContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

const work = [
    {
        title: 'Stone Mind',
        description: 'A mental health app to help users manage stress and anxiety through guided exercises and resources.',
        image: '/assets/work/stone-mind.jpg',
        href: '/work/stone-mind',
    },
    {
        title: 'Violet Orbit',
        description: 'An e-commerce platform specializing in sustainable fashion and eco-friendly products.',
        image: '/assets/work/violet-orbit.jpg',
        href: '/work/violet-orbit',
    },
    {
        title: 'Visual Screen Models',
        description: 'A portfolio website for a modeling agency showcasing their talent and services.',
        image: '/assets/work/visual-screen-models.jpg',
        href: '/work/visual-screen-models',
    },
];

export default function Home() {
    const { isOpen } = useNav();

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo('main', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 });
        return () => tl.kill();
    }, []);
    return (
        <>
            <SectionShell>
                <div className="flex flex-col gap-8 py-8">
                    <div className="flex flex-col gap-6">
                        <Image
                            src="/assets/home-loran.webp"
                            width={96}
                            height={96}
                            className="aspect-square size-28 rounded-full object-cover object-[0_35%]"
                            alt="Picture of Loran Maes sitting at a desk"
                        />
                        <div className="flex flex-col">
                            <h2>Loran</h2>
                            <h1>Maes</h1>
                        </div>
                    </div>

                    <a href="mailto:info@loranmaes.be" className="button-large group relative w-fit" data-copy-clipboard={isOpen ? undefined : true}>
                        info@loranmaes.be
                        <span className="body-medium pointer-events-none absolute inset-0 flex items-center justify-center bg-blue-400 text-foreground opacity-0 transition-opacity duration-100 ease-linear group-hover:opacity-100">
                            <span className="scale-95 transition-transform duration-100 ease-linear group-hover:scale-100">Copy to clipboard</span>
                        </span>
                    </a>

                    <p className="body-large text-end">
                        Hallo! Ik ben een web developer en content creator uit Gent.
                        <br />
                        <br />- Let's work!
                    </p>
                </div>
            </SectionShell>
            <SectionShell>
                <div className="flex flex-col gap-8">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>work.</h5>
                        <button className="small primary">
                            <span className="button-small">Show More</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {work.map((item) => (
                            <WorkItem key={item.title} title={item.title} description={item.description} image={item.image} href={item.href} />
                        ))}
                    </div>
                </div>
            </SectionShell>
            <SectionShell>
                <div className="flex flex-col gap-10">
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>about.</h5>
                        <button className="small primary">
                            <span className="button-small">Show More</span>
                        </button>
                    </div>
                    <p className="body-extra-large text-justify">
                        I collaborate with businesses of all sizes worldwide, using the latest technologies. My designs have also earned multiple
                        rewards.
                    </p>
                    <Image
                        src="/assets/about-loran-full.jpg"
                        width={500}
                        height={500}
                        alt="Picture of Loran Maes in front of a building"
                        className="aspect-[5/3] w-full object-cover"
                    />
                    <p className="body-medium text-justify">
                        I'm dedicated to crafting beautiful and highly functional designs that seamlessly align with my clients' unqiue needs and
                        long-term goals.
                    </p>
                </div>
            </SectionShell>
            <Footer />
        </>
    );
}
