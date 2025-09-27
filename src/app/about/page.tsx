'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

export default function About() {
	useGSAP(() => {
		const tl = gsap.timeline();
		tl.fromTo('main', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 });
		return () => tl.kill();
	}, []);
	return (
		<main className="min-h-screen flex flex-col items-center justify-center p-8">
			About page
			<p>Test</p>
		</main>
	);
}
