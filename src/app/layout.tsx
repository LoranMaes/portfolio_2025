import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactLenis from 'lenis/react';
import Header from '@/components/Header/Index';
import CustomCursor from '@/components/CustomCursor/Index';
import { unstable_ViewTransition as ViewTransitions } from 'react';
import TransitionOverlay from '@/components/TransitionOverlay/Index';
import { NavProvider } from '@/Contexts/NavContext';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Loran Maes - Fullstack Developer & Content Creator',
	description: 'Portfolio of Loran Maes, a Fullstack Developer and Content Creator from Ghent, Belgium.',
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
					<Header />
					{children}
					<ReactLenis root />
					<CustomCursor />
					<TransitionOverlay />
				</NavProvider>
			</body>
		</html>
	);
}
