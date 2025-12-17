'use client';
import { usePathname } from 'next/navigation';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ScreenContextType = {
    isMobile: boolean;
};

const ScreenContext = createContext<ScreenContextType | null>(null);
export function ScreenProvider({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    const checkScreenSize = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, [checkScreenSize]);

    // Optional: Close any mobile-specific UI on route change
    useEffect(() => {
        checkScreenSize();
    }, [pathname, checkScreenSize]);

    const value = useMemo(() => ({ isMobile }), [isMobile]);

    return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
}

export function useScreen() {
    const ctx = useContext(ScreenContext);
    if (!ctx) throw new Error('useScreen must be used within <ScreenProvider>');
    return ctx;
}
