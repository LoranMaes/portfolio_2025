'use client';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { gsap } from 'gsap';
import { useNav } from '@/Contexts/NavContext';

interface TransitionLinkProps extends LinkProps {
	children: React.ReactNode;
	href: string;
	className?: string;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({ children, href, className, ...props }) => {
	const router = useRouter();
	const { close } = useNav();

	const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		// Don't run if the link is external or if it's the current page
		if (!href.startsWith('/') || href === window.location.pathname) return;

		e.preventDefault();

		close();

		const overlay = document.querySelector('#route-transition');
		if (!overlay) {
			// Fallback: just navigate if overlay isn't mounted
			router.push(href);
			return;
		}

		document.body.classList.add('is-transitioning');

		const tl = gsap.timeline({
			defaults: { duration: 1, ease: 'power4.inOut' },
		});

		// 1) Cover from bottom → top with a tiny overshoot for that "top reaches first" feel
		tl.set(overlay, { transformOrigin: '50% 100%', scaleY: 0 })
			.to(overlay, { scaleY: 1 }) // cover
			.to(
				overlay,
				{
					// slight stretch/overshoot to make the top feel like it snaps first
					duration: 0.18,
					scaleY: 1.035,
					ease: 'expo.out',
				},
				'>-0.08'
			)
			.to(
				overlay,
				{
					// settle back to 1
					duration: 0.18,
					scaleY: 1,
					ease: 'power3.out',
				},
				'>-0.05'
			);

		// 2) Navigate once fully covered
		tl.add(() => {
			// give Next a heartbeat to render the new route
			setTimeout(() => {
				router.push(href);
			}, 50);
		});

		// 3) Reveal: bottom slides up with a springy feel (origin = top)
		tl.set(overlay, { transformOrigin: '50% 0%' }) // top center
			.to(
				overlay,
				{
					duration: 0.9,
					scaleY: 0,
					// elastic spring: amplitude, period — tune to taste
					ease: 'elastic.out(1, 2)',
				},
				'+=0.05'
			)
			.add(() => {
				document.body.classList.remove('is-transitioning');
			});
	};

	return (
		<Link {...props} href={href} onClick={handleTransition} className={className}>
			{children}
		</Link>
	);
};
