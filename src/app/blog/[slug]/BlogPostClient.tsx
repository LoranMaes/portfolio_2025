'use client';

import type { BlogPost } from '@/assets/database/blog-posts';
import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import { TransitionLink } from '@/components/TransitionLink/Index';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function BlogPostClient({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
    const articleRef = useRef<HTMLDivElement>(null);

    const cardClass = 'border border-foreground/10 bg-foreground/[0.03] p-6 md:p-8';
    const pillClass = 'body-small inline-flex rounded-full border border-foreground/20 px-3 py-1 uppercase tracking-[0.08em]';

    return (
        <FooterRevealLayout triggerRef={articleRef}>
            <SectionShell className="min-h-[75vh]">
                <div className="m-auto flex w-full flex-col gap-6 md:max-w-5xl">
                    <TransitionLink href="/blog" className="body-medium w-fit text-foreground/70 transition-opacity hover:opacity-70">
                        ← Back to Blog
                    </TransitionLink>
                    <p className="body-small uppercase tracking-[0.14em] text-foreground/60">Article</p>
                    <h1 className="flex h-fit flex-col">
                        <span>{post.title}</span>
                    </h1>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={pillClass}>{post.category}</span>
                        <span className="body-small text-foreground/60">{post.publishedAt}</span>
                        <span className="body-small text-foreground/60">{post.readTime}</span>
                    </div>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-8 md:w-full">
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-foreground/10">
                        <Image src={post.coverImage} alt={`${post.title} cover`} fill className="object-cover" priority />
                    </div>
                    <div className="flex w-full items-center justify-between gap-4">
                        <h5>overview.</h5>
                    </div>
                    <p className="body-extra-large max-w-10/12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.excerpt}</p>
                </div>
            </SectionShell>

            <SectionShell>
                <div className="flex flex-col gap-4 md:w-full md:flex-row md:items-start">
                    <article className={`${cardClass} flex w-full flex-col gap-5 md:w-2/3`}>
                        <h5>read.</h5>
                        <div className="flex flex-col gap-6">
                            {post.content.map((paragraph) => (
                                <p key={paragraph.slice(0, 24)} className="body-medium text-foreground/85">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </article>
                    <aside className={`${cardClass} flex w-full flex-col gap-4 md:w-1/3`}>
                        <h6>Key Takeaways</h6>
                        <ul className="flex flex-col gap-3">
                            {post.keyTakeaways.map((takeaway) => (
                                <li key={takeaway} className="body-small text-foreground/80">
                                    {takeaway}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </SectionShell>

            <div ref={articleRef} className="relative z-10 bg-background">
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>related posts.</h5>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((item) => (
                                <TransitionLink key={item.slug} href={`/blog/${item.slug}`} className={`${cardClass} flex h-full flex-col gap-3`}>
                                    <span className={pillClass}>{item.category}</span>
                                    <h6>{item.title}</h6>
                                    <p className="body-small text-foreground/80">{item.excerpt}</p>
                                </TransitionLink>
                            ))}
                        </div>
                    </div>
                </SectionShell>

                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div className="flex w-full flex-col gap-3 lg:w-2/3">
                                <h5>need help on your next project?</h5>
                                <p className="body-large text-foreground/80">If this article resonates, let&apos;s apply the same thinking to your project.</p>
                            </div>
                            <Link href="/contact" className="button small primary">
                                <span className="button-small">Get in Touch</span>
                            </Link>
                        </div>
                    </div>
                </SectionShell>
            </div>
        </FooterRevealLayout>
    );
}
