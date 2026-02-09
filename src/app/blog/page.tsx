import { blogPosts } from '@/assets/database/blog-posts';
import BlogIndexClient from './BlogIndexClient';

export default function BlogPage() {
    return <BlogIndexClient posts={blogPosts} />;
}
