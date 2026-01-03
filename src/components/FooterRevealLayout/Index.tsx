'use client';

import Footer from '@/components/Footer/Index';
import { useFooterReveal } from '@/hooks/useFooterReveal';
import { Fragment, ReactNode, RefObject } from 'react';

interface FooterRevealLayoutProps {
    children: ReactNode;
    triggerRef: RefObject<HTMLElement | null>;
}

export default function FooterRevealLayout({ children, triggerRef }: FooterRevealLayoutProps) {
    const { footerFixedRef, endSentinelRef } = useFooterReveal(triggerRef);

    return (
        <Fragment>
            {/* Footer fixed behind everything */}
            <div ref={footerFixedRef} className="fixed inset-0 z-0">
                <Footer />
            </div>

            {/* Foreground content that scrolls away to reveal the footer */}
            <main className="relative z-10 bg-background">{children}</main>

            {/* This creates the reveal: you scroll "into" the footer area (footer is fixed behind) */}
            <div ref={endSentinelRef} className="pointer-events-none h-screen" />
        </Fragment>
    );
}
