import Link from 'next/link';
import { Post } from '@/lib/types/post';

type PostNavigationProps = {
    prevPost: Post | null;
    nextPost: Post | null;
};

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
    return (
        <nav className="gap-2 grid grid-cols-1 md:grid-cols-2 text-sm">
            {prevPost ? (
                <Link
                    href={`/posts/${prevPost.slug}`}
                    className="flex no-underline bg-gray-50 dark:bg-gray-800 text-center justify-center w-full border border-gray-300 dark:border-slate-500 px-3 py-4 rounded-xl"
                >
                    Предыдущий пост: {prevPost.title}
                </Link>
            ) : (
                <span />
            )}
            {nextPost ? (
                <Link
                    href={`/posts/${nextPost.slug}`}
                    className="flex no-underline bg-gray-50 dark:bg-gray-800 text-center justify-center w-full border border-gray-300 dark:border-slate-500 px-3 py-4 rounded-xl"
                >
                    Следующий пост: {nextPost.title}
                </Link>
            ) : (
                <span />
            )}
        </nav>
    );
}