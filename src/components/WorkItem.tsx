import { TransitionLink } from '@/components/TransitionLink/Index';

export default function WorkItem({
    title,
    description,
    image,
    href,
    discipline,
    className,
}: {
    title: string;
    description: string;
    image: string;
    href: string;
    discipline: string;
    className?: string;
}) {
    return (
        <TransitionLink
            href={href}
            className={`group relative flex aspect-square w-full items-end bg-cover bg-center p-8 ` + (className ?? '')}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="relative z-20 flex h-fit flex-col items-start gap-2">
                <h4 className="h-fit w-fit text-foreground transition-all duration-200 ease-linear md:translate-y-0 md:opacity-0 md:group-hover:-translate-y-2 md:group-hover:opacity-100">
                    {title}
                </h4>
                <span className="body-small inline-flex rounded-full border border-white/80 px-3 py-1 text-foreground transition-all duration-200 ease-linear md:translate-y-0 md:opacity-0 md:group-hover:-translate-y-2 md:group-hover:opacity-100">
                    {discipline}
                </span>
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0)] from-50% to-[rgba(0,0,0,0.5)] transition-all duration-150 ease-linear will-change-transform md:opacity-0 md:group-hover:opacity-100"></div>
        </TransitionLink>
    );
}
