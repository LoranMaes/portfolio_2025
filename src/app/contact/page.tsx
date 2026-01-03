'use client';

import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import { useRef } from 'react';

export default function Contact() {
    // Contact is the trigger (scrolls normally)
    const contactRef = useRef<HTMLDivElement>(null);
    return (
        <FooterRevealLayout triggerRef={contactRef}>
            <SectionShell className="min-h-[75vh]">
                <h1 className="my-auto flex h-fit flex-col">
                    <span>SHOOT A</span>
                    <span>REQUEST</span>
                </h1>
            </SectionShell>
            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full md:flex-row md:justify-between" ref={contactRef}>
                    <a href="mailto:info@loranmaes.be" className="button-large group relative h-fit w-fit" data-copy-clipboard>
                        info@loranmaes.be
                        <span className="body-medium pointer-events-none absolute inset-0 flex items-center justify-center bg-blue-400 text-foreground opacity-0 transition-opacity duration-100 ease-linear group-hover:opacity-100">
                            <span className="scale-95 transition-transform duration-100 ease-linear group-hover:scale-100">Copy to clipboard</span>
                        </span>
                    </a>
                    <form action="#" className="flex w-full flex-col gap-5 md:w-2/3">
                        <label htmlFor="" className="w-full">
                            <input type="text" placeholder="Your Name" className="w-full bg-gray-200 p-6 text-gray-800" />
                        </label>
                        <label htmlFor="" className="w-full">
                            <input type="text" placeholder="Your email" className="w-full bg-gray-200 p-6 text-gray-800" />
                        </label>
                        <label htmlFor="" className="w-full">
                            <textarea
                                name=""
                                id=""
                                placeholder="Your masterpiece starts here"
                                className="w-full bg-gray-200 p-6 text-gray-800"
                            ></textarea>
                        </label>
                        <button type="submit" className="normal primary">
                            <span className="button-small">Send It!</span>
                        </button>
                    </form>
                </div>
            </SectionShell>
        </FooterRevealLayout>
    );
}
