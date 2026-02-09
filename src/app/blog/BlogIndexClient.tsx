'use client';

import type { BlogPost } from '@/assets/database/blog-posts';
import FooterRevealLayout from '@/components/FooterRevealLayout/Index';
import SectionShell from '@/components/SectionShell/Index';
import { TransitionLink } from '@/components/TransitionLink/Index';
import Image from 'next/image';
import { useRef } from 'react';

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
    const blogRef = useRef<HTMLDivElement>(null);

    const featuredPost = posts[0];
    const latestPosts = posts.slice(1);
    const cardClass = 'border border-foreground/10 bg-foreground/[0.03] p-6 md:p-8';
    const pillClass = 'body-small inline-flex rounded-full border border-foreground/20 px-3 py-1 uppercase tracking-[0.08em]';

    return (
        <FooterRevealLayout triggerRef={blogRef}>
            <SectionShell className="min-h-[75vh]">
                <div className="m-auto flex w-full flex-col gap-6 md:max-w-5xl">
                    <p className="body-small uppercase tracking-[0.14em] text-foreground/60">Journal</p>
                    <h1 className="flex h-fit flex-col">
                        <span>Blog</span>
                        <span>Posts</span>
                    </h1>
                    <p className="body-large max-w-4xl text-foreground/80">
                        Notes and practical writeups on web development, systems thinking, and content creation workflows.
                    </p>
                </div>
            </SectionShell>

            {featuredPost && (
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>featured post.</h5>
                        </div>
                        <TransitionLink href={`/blog/${featuredPost.slug}`} className="group overflow-hidden border border-foreground/10 bg-foreground/[0.03]">
                            <div className="relative aspect-[16/9] w-full overflow-hidden">
                                <Image
                                    src={featuredPost.coverImage}
                                    alt={`${featuredPost.title} cover`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col gap-5 p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={pillClass}>{featuredPost.category}</span>
                                    <span className="body-small text-foreground/60">{featuredPost.publishedAt}</span>
                                    <span className="body-small text-foreground/60">{featuredPost.readTime}</span>
                                </div>
                                <h4>{featuredPost.title}</h4>
                                <p className="body-medium text-foreground/80">{featuredPost.excerpt}</p>
                            </div>
                        </TransitionLink>
                    </div>
                </SectionShell>
            )}

            <div ref={blogRef} className="relative z-10 bg-background">
                <SectionShell>
                    <div className="flex flex-col gap-8 md:w-full">
                        <div className="flex w-full items-center justify-between gap-4">
                            <h5>latest posts.</h5>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {latestPosts.map((post) => (
                                <TransitionLink key={post.slug} href={`/blog/${post.slug}`} className={`${cardClass} flex h-full flex-col gap-4`}>
                                    <span className={pillClass}>{post.category}</span>
                                    <h6>{post.title}</h6>
                                    <p className="body-small text-foreground/80">{post.excerpt}</p>
                                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                                        <span className="body-small text-foreground/60">{post.publishedAt}</span>
                                        <span className="body-small text-foreground/60">{post.readTime}</span>
                                    </div>
                                </TransitionLink>
                            ))}
                        </div>
                    </div>
                </SectionShell>
            </div>
        </FooterRevealLayout>
    );
}
