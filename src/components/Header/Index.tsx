'use client';
import Link from 'next/link';

export default function Header() {
	return (
		<header>
			<h1 className="text-4xl sm:text-5xl font-extrabold text-center">Welcome to Next.js!</h1>
			<nav>
				<ul className="flex gap-4 justify-center mt-2">
					<li>
						<Link href={'/about'} className="text-sm sm:text-base underline underline-offset-4">
							About Page
						</Link>
					</li>
					<li>
						<Link href={'/contact'} className="text-sm sm:text-base underline underline-offset-4">
							Contact Page
						</Link>
					</li>
					<li>
						<Link href={'/web-developer'} className="text-sm sm:text-base underline underline-offset-4">
							Web Developer Page
						</Link>
					</li>
					<li>
						<Link href={'/blog'} className="text-sm sm:text-base underline underline-offset-4">
							Blog Page
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
