import { ReactNode } from 'react';

interface SectionShellProps {
    children: ReactNode;
    className?: string;
}

export default function SectionShell({ children, className = '' }: SectionShellProps) {
    return (
        <section className={`flex w-full gap-8 border-t border-t-foreground/10 px-5 py-8 md:px-20 md:py-8 ${className}`}>
            <div className="mx-auto flex w-full max-w-[1400px] flex-col md:flex-row">{children}</div>
        </section>
    );
}
