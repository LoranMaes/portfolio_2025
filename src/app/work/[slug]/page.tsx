import { getProjectBySlug, portfolioProjects } from '@/assets/database/projects';
import { notFound } from 'next/navigation';
import WorkProjectDetailClient from './WorkProjectDetailClient';

export default async function WorkProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const relatedProjects = portfolioProjects.filter((item) => item.slug !== slug).slice(0, 3);

    return <WorkProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}
