'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useRef } from 'react';

export function useFooterReveal(triggerRef: RefObject<HTMLElement | null>) {
    const footerFixedRef = useRef<HTMLDivElement>(null);
    const endSentinelRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();

        // Reveal footer + ensure the bottom of the footer can be reached.
        // If the footer is taller than the viewport, we translate it upward while scrolling the reveal area.
        if (triggerRef.current && footerFixedRef.current && endSentinelRef.current) {
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
                        trigger: triggerRef.current,
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
    }, [triggerRef]);

    return { footerFixedRef, endSentinelRef };
}
