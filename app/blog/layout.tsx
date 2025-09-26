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
			<header className="blog-header">
				<h1 className="text-3xl font-bold">Blog</h1>
				<p className="text-muted">Insights on coding, design & content creation</p>
			</header>

			<main className="blog-content">{children}</main>
		</section>
	);
}
