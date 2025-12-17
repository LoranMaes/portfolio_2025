import CustomCursor from '@/components/CustomCursor/Index';
import Header from '@/components/Header/Index';
import TransitionOverlay from '@/components/TransitionOverlay/Index';
import { NavProvider } from '@/Contexts/NavContext';
import { ScreenProvider } from '@/Contexts/ScreenContext';
import ReactLenis from 'lenis/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Loran Maes - Fullstack Developer & Content Creator',
    description: 'Portfolio van Loran Maes, een fullstack developer en content creator uit Gent, België.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>
                <NavProvider>
                    <ScreenProvider>
                        <Header />
                        {children}
                        <ReactLenis root />
                        <CustomCursor />
                        <TransitionOverlay />
                    </ScreenProvider>
                </NavProvider>
            </body>
        </html>
    );
}
