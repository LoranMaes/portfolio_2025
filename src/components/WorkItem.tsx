import Link from 'next/link';

export default function WorkItem({
    title,
    description,
    image,
    href,
    className,
}: {
    title: string;
    description: string;
    image: string;
    href: string;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={`group relative flex aspect-square w-full items-end bg-cover bg-center p-8 ` + (className ?? '')}
            style={{ backgroundImage: `url(${image})` }}
        >
            <h4 className="relative z-20 h-fit w-fit text-foreground transition-all duration-200 ease-linear md:translate-y-0 md:opacity-0 md:group-hover:-translate-y-2 md:group-hover:opacity-100">
                {title}
            </h4>
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0)] from-50% to-[rgba(0,0,0,0.5)] transition-all duration-150 ease-linear will-change-transform md:opacity-0 md:group-hover:opacity-100"></div>
        </Link>
    );
}
