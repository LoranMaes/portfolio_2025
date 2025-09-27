// app/blog/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		default: 'Blog',
		template: '%s | Blog | Loran Maes',
	},
	description: 'Articles on fullstack development, React (Native), Symfony/Laravel, and Creator Workflow.',
};

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="blog-layout">
			<main className="blog-content">{children}</main>
		</section>
	);
}
