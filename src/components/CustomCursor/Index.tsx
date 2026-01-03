'use client';
import { useScreen } from '@/Contexts/ScreenContext';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const { isMobile } = useScreen();

    const [size, setSize] = useState(20);
    const [opacity, setOpacity] = useState(0);
    const [cursorText, setCursorText] = useState('');

    const mouse = useRef({ x: 0, y: 0 });
    const cursor = useRef<HTMLDivElement>(null);

    const hoverableElements = ['a', 'button', '[role="button"]', '.clickable', 'summary'];

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
        let hasCopyAttribute = false;
        const elements = document.elementsFromPoint(x, y);
        for (const el of elements) {
            if (el instanceof HTMLElement) {
                // Check for data-copy-clipboard attribute
                if (el.hasAttribute('data-copy-clipboard')) {
                    hasCopyAttribute = true;
                    cursorShouldScale = true;
                    break;
                }

                const style = window.getComputedStyle(el);
                if (style.cursor === 'pointer' || hoverableElements.includes(el.tagName.toLowerCase()) || el.getAttribute('role') === 'button') {
                    cursorShouldScale = true;
                    break;
                }
            }
        }

        if (hasCopyAttribute) {
            setSize(70);
            setCursorText('Copy');
        } else {
            cursorShouldScale ? setSize(70) : setSize(20);
            setCursorText('');
        }

        gsap.set(cursor.current, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
        });
    };

    useEffect(() => {
        if (isMobile) return;

        window.addEventListener('mousemove', manageMouse);
        return () => {
            window.removeEventListener('mousemove', manageMouse);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div
            ref={cursor}
            className={`md:pointer-events-none md:fixed md:top-0 md:left-0 md:z-[999] md:flex md:cursor-none md:items-center md:justify-center md:rounded-full md:bg-background md:transition-[height,_width,_padding] md:duration-100 md:ease-linear md:dark:bg-foreground ${cursorText ? 'md:px-8 md:py-4' : 'md:mix-blend-difference'}`}
            style={{ width: cursorText ? 'auto' : size, height: cursorText ? 'auto' : size, opacity: opacity }}
        >
            <span
                className={`body-medium leading-none font-medium text-foreground transition-opacity duration-100 dark:text-background ${cursorText ? 'opacity-100' : 'opacity-0'}`}
            >
                {cursorText || 'Copy'}
            </span>
        </div>
    );
}
