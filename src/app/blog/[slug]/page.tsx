import { blogPosts, getBlogPostBySlug } from '@/assets/database/blog-posts';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = blogPosts.filter((item) => item.slug !== slug).slice(0, 3);

    return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
