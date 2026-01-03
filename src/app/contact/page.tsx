'use client';

import Footer from '@/components/Footer/Index';
import SectionShell from '@/components/SectionShell/Index';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fragment, useRef } from 'react';

export default function Contact() {
    // Contact is the trigger (scrolls normally)
    const contactRef = useRef<HTMLDivElement>(null);

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
        if (contactRef.current && footerFixedRef.current && endSentinelRef.current) {
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
                        trigger: contactRef.current,
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
                    <h1 className="my-auto flex h-fit flex-col">
                        <span>SHOOT A</span>
                        <span>REQUEST</span>
                    </h1>
                </SectionShell>
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full md:flex-row md:justify-between" ref={contactRef}>
                        <a href="mailto:info@loranmaes.be" className="button-large group relative h-fit w-fit" data-copy-clipboard>
                            info@loranmaes.be
                            <span className="body-medium pointer-events-none absolute inset-0 flex items-center justify-center bg-blue-400 text-foreground opacity-0 transition-opacity duration-100 ease-linear group-hover:opacity-100">
                                <span className="scale-95 transition-transform duration-100 ease-linear group-hover:scale-100">
                                    Copy to clipboard
                                </span>
                            </span>
                        </a>
                        <form action="#" className="flex w-full flex-col gap-5 md:w-2/3">
                            <label htmlFor="" className="w-full">
                                <input type="text" placeholder="Your Name" className="w-full bg-gray-200 p-6 text-gray-800" />
                            </label>
                            <label htmlFor="" className="w-full">
                                <input type="text" placeholder="Your email" className="w-full bg-gray-200 p-6 text-gray-800" />
                            </label>
                            <label htmlFor="" className="w-full">
                                <textarea
                                    name=""
                                    id=""
                                    placeholder="Your masterpiece starts here"
                                    className="w-full bg-gray-200 p-6 text-gray-800"
                                ></textarea>
                            </label>
                            <button type="submit" className="normal primary">
                                <span className="button-small">Send It!</span>
                            </button>
                        </form>
                    </div>
                </SectionShell>
            </main>
            {/* This creates the reveal: you scroll “into” the footer area (footer is fixed behind) */}
            <div ref={endSentinelRef} className="pointer-events-none h-screen" />
        </Fragment>
    );
}
