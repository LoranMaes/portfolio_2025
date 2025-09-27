import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactLenis from 'lenis/react';
import ClientWrapper from './ClientWrapper';
import Header from '@/components/Header/Index';

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
				<ReactLenis root />
				<ClientWrapper>
					<Header />
					{children}
				</ClientWrapper>
			</body>
		</html>
	);
}
