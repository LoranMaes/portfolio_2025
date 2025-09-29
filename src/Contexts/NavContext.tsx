'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type NavContextType = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((v) => !v), []);

	// Lock/unlock scroll when menu is open
	useEffect(() => {
		document.documentElement.classList.toggle('noScroll', isOpen);
		document.body.classList.toggle('noScroll', isOpen);
		return () => {
			document.documentElement.classList.remove('noScroll');
			document.body.classList.remove('noScroll');
		};
	}, [isOpen]);

	// Close on route change
	useEffect(() => {
		// whenever pathname changes, ensure the menu is closed
		setIsOpen(false);
	}, [pathname]);

	const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);
	return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
	const ctx = useContext(NavContext);
	if (!ctx) throw new Error('useNav must be used within <NavProvider>');
	return ctx;
}
