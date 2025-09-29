'use client';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
	const mouse = useRef({ x: 0, y: 0 });
	const cursor = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState(20);
	const [opacity, setOpacity] = useState(0);

	const manageMouse = (event: MouseEvent) => {
		if (!opacity) setOpacity(1);

		const { clientX, clientY } = event;
		mouse.current = {
			x: clientX,
			y: clientY,
		};

		moveCircle(mouse.current.x, mouse.current.y);
	};

	const moveCircle = (x: number, y: number) => {
		// If the cursor is above a clickable element, scale it up
		let cursorShouldScale = false;
		const elements = document.elementsFromPoint(x, y);
		for (const el of elements) {
			if (el instanceof HTMLElement) {
				const style = window.getComputedStyle(el);
				if (
					style.cursor === 'pointer' ||
					el.tagName === 'A' ||
					el.tagName === 'BUTTON' ||
					el.getAttribute('role') === 'button'
				) {
					cursorShouldScale = true;
					break;
				}
			}
		}

		cursorShouldScale ? setSize(70) : setSize(20);

		gsap.set(cursor.current, {
			x,
			y,
			xPercent: -50,
			yPercent: -50,
		});
	};

	useEffect(() => {
		window.addEventListener('mousemove', manageMouse);
		return () => {
			window.removeEventListener('mousemove', manageMouse);
		};
	}, []);

	return (
		<div
			ref={cursor}
			className="bg-background dark:bg-foreground fixed top-0 transition-[width,_height] duration-100 ease-linear left-0 z-[999] rounded-full mix-blend-difference pointer-events-none cursor-none"
			style={{ width: size, height: size, opacity: opacity }}
		></div>
	);
}
