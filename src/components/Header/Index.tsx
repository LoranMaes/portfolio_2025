'use client';
import { header_links, title } from '@/assets/database';
import { useNav } from '@/Contexts/NavContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import Hamburger from '../Hamburger/Index';
import { TransitionLink } from '../TransitionLink/Index';

export default function Header() {
    const { isOpen, toggle } = useNav();
    const pathname = usePathname();
    const upperWrapper = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    const normalizePath = (path: string) => {
        if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
        return path;
    };

    const isActiveLink = (href: string) => {
        const current = normalizePath(pathname);
        const target = normalizePath(href);
        if (target === '/') return current === '/';
        return current === target || current.startsWith(`${target}/`);
    };

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
                    },
                );
            } else {
                gsap.fromTo(
                    links,
                    { y: 0, autoAlpha: 1 },
                    { y: -20, autoAlpha: 0, duration: 0.3, ease: 'power3.in', stagger: { each: 0.1, from: 'start' } },
                );
            }
        },
        { scope: navRef, dependencies: [isOpen] },
    );

    return (
        <header className="relative mx-auto flex max-w-[1600px]">
            <div className="relative z-20 flex w-full items-center justify-between gap-2 bg-background p-5" ref={upperWrapper}>
                <TransitionLink href="/" className="text-3xl font-bold tracking-tighter">
                    <p>{title}</p>
                </TransitionLink>
                <Hamburger onClick={toggle} isOpen={isOpen} />
            </div>

            <nav
                ref={navRef}
                className={`${isOpen ? 'h-screen' : 'h-0'} z-[19] grid overflow-hidden mt-[${
                    upperWrapper.current?.clientHeight
                }px] absolute w-screen items-center justify-center gap-10 bg-background p-5 transition-all duration-1000 ease-initial`}
            >
                <ul className="flex h-min grow flex-col items-center justify-center gap-[30px]">
                    {header_links.map((link) => (
                        <li
                            key={link.href}
                            className={`transition-opacity duration-150 ${isActiveLink(link.href) ? 'opacity-100' : 'opacity-75 hover:opacity-50'}`}
                        >
                            <TransitionLink
                                href={link.href}
                                aria-current={isActiveLink(link.href) ? 'page' : undefined}
                                className="navigation-link relative"
                            >
                                <span className="flex flex-col items-center gap-2">
                                    <span>{link.name}</span>
                                    <span
                                        className={`h-[2px] w-10 bg-foreground transition-opacity duration-200 ${
                                            isActiveLink(link.href) ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />
                                </span>
                            </TransitionLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
