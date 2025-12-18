import Link from 'next/link';

const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'YouTube', href: 'https://youtube.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'TikTok', href: 'https://tiktok.com' },
];

export default function Footer() {
    return (
        <footer className="relative mx-auto flex h-fit min-h-screen w-full max-w-[1400px] flex-col gap-10 px-4 pt-36 pb-6 md:justify-between md:px-8 md:py-14">
            <nav className="flex w-full md:justify-end">
                <ul className="flex gap-8">
                    {socialLinks.map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} target="_blank" rel="noopener noreferrer" className="button-small">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex flex-col gap-8">
                <h4 className="text-[3rem]">Curious about what we can create together? Let's bring something extraordinary to life!</h4>

                <div className="flex flex-col gap-8 md:flex-row-reverse md:justify-end">
                    <div className="flex items-center gap-4">
                        <span className="relative flex size-3 animate-pulse items-center justify-center rounded-full bg-foreground">
                            <span className="absolute size-3 animate-ping rounded-full bg-foreground duration-500"></span>
                            <span className="sr-only">Animated pulse</span>
                        </span>
                        <p className="body-small">Available For Work</p>
                    </div>
                    <button className="small primary md:w-fit">
                        <span className="button-small">Get in Touch</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-6 md:w-full">
                <div className="flex md:grid md:grid-cols-3">
                    <div className="flex w-full flex-col px-1 md:col-span-1">
                        <p className="body-small">+32(4)89 40 11 45</p>
                        <p className="body-small">info@loranmaes.be</p>
                    </div>
                    <div className="flex w-full flex-col px-1 md:col-span-1">
                        <p className="body-small">Developed</p>
                        <p className="body-small">by Loran Maes</p>
                    </div>
                    <p className="body-small hidden w-full text-center md:col-span-1 md:inline-block md:text-left">
                        © 2025 Loran Maes. All rights reserved.
                    </p>
                </div>
                <hr className="h-px border-none bg-foreground/10 md:hidden" />
                <p className="body-small w-full text-center md:hidden">© 2025 Loran Maes. All rights reserved.</p>
            </div>
        </footer>
    );
}
