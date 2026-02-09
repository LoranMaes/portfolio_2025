'use client';

import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import { FormEvent, useRef, useState } from 'react';

type ContactFormData = {
    name: string;
    email: string;
    message: string;
    website: string;
    formStartedAt: string;
};

const INITIAL_FORM_DATA: ContactFormData = {
    name: '',
    email: '',
    message: '',
    website: '',
    formStartedAt: '',
};

export default function Contact() {
    const contactRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        ...INITIAL_FORM_DATA,
        formStartedAt: String(Date.now()),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [statusType, setStatusType] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setStatusType('idle');
        setStatusMessage('');

        const formAge = Date.now() - Number(formData.formStartedAt);
        if (!Number.isFinite(formAge) || formAge < 1200) {
            setStatusType('error');
            setStatusMessage('Please take a moment to complete the form before sending.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const payload = (await response.json().catch(() => null)) as { error?: string; ok?: boolean } | null;

            if (!response.ok || !payload?.ok) {
                setStatusType('error');
                setStatusMessage(payload?.error ?? 'Something went wrong while sending your message. Please try again.');
                return;
            }

            setStatusType('success');
            setStatusMessage('Thanks for reaching out. Your message was sent successfully.');
            setFormData({
                ...INITIAL_FORM_DATA,
                formStartedAt: String(Date.now()),
            });
        } catch {
            setStatusType('error');
            setStatusMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FooterRevealLayout triggerRef={contactRef}>
            <SectionShell className="min-h-[75vh]">
                <h1 className="my-auto flex h-fit flex-col">
                    <span>SHOOT A</span>
                    <span>REQUEST</span>
                </h1>
            </SectionShell>

            <div ref={contactRef} className="relative z-10 bg-background">
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full md:flex-row md:justify-between">
                        <a href="mailto:info@loranmaes.be" className="button-large group relative h-fit w-fit" data-copy-clipboard>
                            info@loranmaes.be
                            <span className="body-medium pointer-events-none absolute inset-0 flex items-center justify-center bg-blue-400 text-foreground opacity-0 transition-opacity duration-100 ease-linear group-hover:opacity-100">
                                <span className="scale-95 transition-transform duration-100 ease-linear group-hover:scale-100">Copy to clipboard</span>
                            </span>
                        </a>

                        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 md:w-2/3" noValidate>
                            <label htmlFor="contact-name" className="w-full">
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    autoComplete="name"
                                    required
                                    minLength={2}
                                    maxLength={80}
                                    value={formData.name}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                                    className="w-full border border-foreground/15 bg-foreground/[0.03] p-6 text-foreground placeholder:text-foreground/45"
                                />
                            </label>

                            <label htmlFor="contact-email" className="w-full">
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    placeholder="Your email"
                                    autoComplete="email"
                                    required
                                    maxLength={200}
                                    value={formData.email}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                                    className="w-full border border-foreground/15 bg-foreground/[0.03] p-6 text-foreground placeholder:text-foreground/45"
                                />
                            </label>

                            {/* Honeypot field for basic spam filtering */}
                            <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                                <label htmlFor="contact-website">Website</label>
                                <input
                                    id="contact-website"
                                    name="website"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={formData.website}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, website: event.target.value }))}
                                />
                            </div>

                            <input type="hidden" name="formStartedAt" value={formData.formStartedAt} />

                            <label htmlFor="contact-message" className="w-full">
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    placeholder="Your masterpiece starts here"
                                    required
                                    minLength={10}
                                    maxLength={5000}
                                    value={formData.message}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                                    className="min-h-48 w-full border border-foreground/15 bg-foreground/[0.03] p-6 text-foreground placeholder:text-foreground/45"
                                />
                            </label>

                            <button type="submit" className="normal primary disabled:opacity-60" disabled={isSubmitting}>
                                <span className="button-small">{isSubmitting ? 'Sending...' : 'Send It!'}</span>
                            </button>

                            {statusMessage && (
                                <p className={`body-small ${statusType === 'error' ? 'text-red-500' : 'text-foreground/75'}`} role="status" aria-live="polite">
                                    {statusMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </SectionShell>
            </div>
        </FooterRevealLayout>
    );
}
