import SectionShell from '@/components/SectionShell/Index';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex grow">
            <SectionShell>
                <div className="flex w-full flex-col gap-12">
                    <h1 className="flex flex-col uppercase">
                        <span>Page</span>
                        <span>Not</span>
                        <span>Found</span>
                    </h1>
                    <div className="flex w-full items-center justify-between gap-8">
                        <Link href="/" className="button small primary">
                            <span className="button-normal">Back Home</span>
                        </Link>
                        <h5>404</h5>
                    </div>
                </div>
            </SectionShell>
        </main>
    );
}
