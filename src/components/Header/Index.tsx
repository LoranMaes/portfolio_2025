'use client';
import { header_links, title } from '@/assets/database';
import Hamburger from '../Hamburger/Index';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TransitionLink } from '../TransitionLink/Index';
import { useNav } from '@/Contexts/NavContext';

export default function Header() {
	const { isOpen, toggle } = useNav();
	const upperWrapper = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const links = gsap.utils.toArray<HTMLElement>('.navigation-link');
			if (isOpen) {
				gsap.fromTo(
					links,
					{ y: 30, autoAlpha: 0 },
					{
						y: 0,
						autoAlpha: 1,
						duration: 0.4,
						ease: 'power3.out',
						delay: 0.85,
						stagger: { each: 0.1, from: 'start' },
					}
				);
			} else {
				gsap.fromTo(
					links,
					{ y: 0, autoAlpha: 1 },
					{ y: -20, autoAlpha: 0, duration: 0.3, ease: 'power3.in', stagger: { each: 0.1, from: 'start' } }
				);
			}
		},
		{ scope: navRef, dependencies: [isOpen] }
	);

	return (
		<header className="relative flex">
			<div
				className="relative z-20 flex items-center gap-2 p-5 justify-between w-full bg-background border border-b border-gray-100"
				ref={upperWrapper}
			>
				<TransitionLink href="/" className="text-3xl font-bold tracking-tighter">
					<p>{title}</p>
				</TransitionLink>
				<Hamburger onClick={toggle} isOpen={isOpen} />
			</div>

			<nav
				ref={navRef}
				className={`${isOpen ? 'h-screen' : 'h-0'} grid overflow-hidden z-10 mt-[${
					upperWrapper.current?.clientHeight
				}px] bg-background absolute w-screen items-center justify-center gap-10 p-5 transition-all duration-1000 ease-initial`}
			>
				<ul className="flex flex-col grow items-center justify-center gap-[30px] h-min">
					{header_links.map((link) => (
						<li key={link.href} className="hover:opacity-50 transition-opacity duration-150">
							<TransitionLink href={link.href} className="navigation-link">
								{link.name}
							</TransitionLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
