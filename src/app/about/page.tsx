'use client';
import Footer from '@/components/Footer/Index';
import SectionShell from '@/components/SectionShell/Index';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Fragment, useRef } from 'react';

const faqData = [
    {
        question: 'What is your creative design process like?',
        answer: "The timeline varies depending on the complexity of the project. Typically, smaller projects like a logo design or single-page website take 1-2 weeks, while larger projects such as full brand identity or multi-page websites can take 4-6 weeks. I'll provide a detailed timeline once we define the scope of the project, and I always aim to deliver on time.",
    },
    {
        question: 'What is your typical project timeline?',
        answer: "The timeline varies depending on the complexity of the project. Typically, smaller projects like a logo design or single-page website take 1-2 weeks, while larger projects such as full brand identity or multi-page websites can take 4-6 weeks. I'll provide a detailed timeline once we define the scope of the project, and I always aim to deliver on time.",
    },
    {
        question: 'How do I get started on a project with you?',
        answer: "The timeline varies depending on the complexity of the project. Typically, smaller projects like a logo design or single-page website take 1-2 weeks, while larger projects such as full brand identity or multi-page websites can take 4-6 weeks. I'll provide a detailed timeline once we define the scope of the project, and I always aim to deliver on time.",
    },
    {
        question: "What should I do if you're fully booked?",
        answer: "The timeline varies depending on the complexity of the project. Typically, smaller projects like a logo design or single-page website take 1-2 weeks, while larger projects such as full brand identity or multi-page websites can take 4-6 weeks. I'll provide a detailed timeline once we define the scope of the project, and I always aim to deliver on time.",
    },
];

const tickerData = ['Kansas', 'Rise', 'Seoul', 'Venice', 'Brussels'];

export default function About() {
    // FAQ is the trigger (scrolls normally)
    const faqRef = useRef<HTMLDivElement>(null);

    // Footer is fixed behind the content (true reveal footer)
    const footerFixedRef = useRef<HTMLDivElement>(null);

    // End sentinel defines “we are completely at the bottom”
    const endSentinelRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();
        // tl.fromTo('main', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 });

        // Reveal footer + ensure the bottom of the footer can be reached.
        // If the footer is taller than the viewport, we translate it upward while scrolling the reveal area.
        if (faqRef.current && footerFixedRef.current && endSentinelRef.current) {
            const footerEl = footerFixedRef.current;

            const getMaxLift = () => {
                const overflow = footerEl.scrollHeight - window.innerHeight;
                return Math.max(0, overflow);
            };

            gsap.fromTo(
                footerEl,
                { y: 80 },
                {
                    // At the very end, lift the footer up just enough so the bottom content is visible.
                    y: () => -getMaxLift(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: faqRef.current,
                        start: 'bottom bottom',
                        endTrigger: endSentinelRef.current,
                        end: 'bottom bottom',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                },
            );
        }

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <Fragment>
            {/* Footer fixed behind everything (this is what makes it NOT feel like flex-col) */}
            <div ref={footerFixedRef} className="fixed inset-0 z-0">
                <Footer />
            </div>

            <main className="relative z-10 bg-background">
                <SectionShell className="min-h-[75vh]">
                    <h1 className="m-auto flex h-fit flex-col">
                        <span>Loran</span>
                        <span>Maes</span>
                    </h1>
                </SectionShell>
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>about.</h5>
                            <button className="small primary">
                                <span className="button-small">Read.cv</span>
                            </button>
                        </div>
                        <p className="body-extra-large max-w-10/12">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I collaborate with businesses of all sizes worldwide, using the latest
                            technologies. My designs have also earned multiple awards.
                        </p>
                        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                            <Image src="/assets/about-loran-full.jpg" alt="Loran Maes" width={500} height={500} className="w-full md:w-2/3" />
                            <p className="body-medium w-full md:w-1/3">
                                I'm dedicated to crafting beautiful and highly functional designs that seamlessly align with my clients' unique needs
                                and long-term goals.
                            </p>
                        </div>
                    </div>
                </SectionShell>
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full">
                            <h5>services.</h5>
                        </div>
                        <div className="flex w-full flex-col items-center gap-2 uppercase italic">
                            <h3>Illustration</h3>
                            <h3>Branding</h3>
                            <h3>Photo</h3>
                            <h3>UI & UX Design</h3>
                            <h3>Video edit</h3>
                        </div>

                        <div className="flex flex-col gap-8">
                            {/* Ticker */}
                            <div className="relative w-full overflow-hidden">
                                <div className="animate-ticker flex gap-8 text-background/75 opacity-50 dark:text-white/75">
                                    {[...tickerData, ...tickerData, ...tickerData, ...tickerData].map((item, index) => (
                                        <span key={index} className="whitespace-nowrap">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-8">
                                <Image
                                    src="/assets/about-loran-full.jpg"
                                    alt="Loran Maes"
                                    width={1000}
                                    height={1000}
                                    className="w-full object-cover md:w-2/3"
                                />
                                <Image
                                    src="/assets/about-loran-full.jpg"
                                    alt="Loran Maes"
                                    width={1000}
                                    height={1000}
                                    className="w-full object-cover md:h-2/3 md:w-1/3"
                                />
                            </div>
                        </div>
                    </div>
                </SectionShell>
                <div ref={faqRef} className="relative z-10 bg-background">
                    <SectionShell>
                        <div className="flex flex-col gap-8 md:w-full">
                            <div className="flex w-full">
                                <h5>FAQs.</h5>
                            </div>
                            <div className="flex w-full flex-col gap-6 md:ml-auto md:w-2/3">
                                {faqData.map((faq, index) => (
                                    <div key={index} className="clickable flex flex-col bg-gray-50 p-8 text-[#171717]">
                                        <details className="peer group flex flex-col overflow-hidden">
                                            <summary className="flex w-full cursor-pointer list-none items-center justify-between">
                                                <h6>{faq.question}</h6>
                                                <span className="inline-block group-open:hidden">+</span>
                                                <span className="hidden group-open:inline-block">-</span>
                                            </summary>
                                        </details>
                                        <div
                                            className="box-border max-h-0 overflow-hidden text-start transition-[max-height] duration-500 ease-in-out peer-[[open]]:max-h-[500px]"
                                            role="definition"
                                        >
                                            <div className="pt-6">
                                                <p className="body-small">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionShell>
                </div>
            </main>
            {/* This creates the reveal: you scroll “into” the footer area (footer is fixed behind) */}
            <div ref={endSentinelRef} className="pointer-events-none h-screen" />
        </Fragment>
    );
}
