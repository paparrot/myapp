import Link from 'next/link'
import { PostWithFormattedDate } from '@/lib/types/post-list'

type PostCardProps = {
    post: PostWithFormattedDate
}

function calculateReadingTime(content: string): string {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `Время чтения: ${minutes} мин`
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link className="block no-underline" href={`posts/${post.slug}`}>
            <article className="border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 rounded-lg shadow-lg p-4 pb-0">
                <div className="flex items-center justify-between my-2">
                    <h2 className="my-0" dangerouslySetInnerHTML={{__html: post.title }}/>
                    <span className="text-sm">{post.formattedDate}</span>
                </div>
                <div className="text-sm flex justify-between text-gray-500 dark:text-gray-400 mb-2">
                    <span>{post.categories.nodes.map(cat => cat.name).join(', ')}</span>
                    <span>{calculateReadingTime(post.content)}</span>
                </div>
                <div dangerouslySetInnerHTML={{__html: post.excerpt }}/>
            </article>
        </Link>
    )
}