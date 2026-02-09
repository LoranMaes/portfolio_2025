import CollaborationDetailClient from './CollaborationDetailClient';

export default async function CollaborationDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <CollaborationDetailClient slug={slug} />;
}
