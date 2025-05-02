'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type Term = { name: string }

type Post = {
    id: string
    title: string
    excerpt: string
    slug: string
    date: string
    content: string
    categories: { nodes: Term[] }
    tags: { nodes: Term[] }
}

type PostWithFormattedDate = Post & {
    formattedDate: string
}

function calculateReadingTime(content: string): string {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `Время чтения: ${minutes} мин`
}

export default function Home({ posts }: { posts: PostWithFormattedDate[] }) {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [search, setSearch] = useState('')

    const categories = useMemo(() => {
        const all = posts.flatMap(p => p.categories.nodes.map(c => c.name))
        return Array.from(new Set(all)).sort()
    }, [posts])

    const filteredPosts = useMemo(() => {
        return posts
            .filter(post =>
                !selectedCategory || post.categories.nodes.some(c => c.name === selectedCategory)
            )
            .filter(post => {
                const query = search.toLowerCase()
                const titleText = post.title.toLowerCase()
                const excerptText = post.excerpt.replace(/<[^>]*>/g, '').toLowerCase()
                return titleText.includes(query) || excerptText.includes(query)
            })
    }, [posts, selectedCategory, search])

    return (
        <div className="prose dark:prose-invert mt-6 space-y-4">
            <div className="flex flex-col gap-4 items-start md:items-center mb-4 w-full">
                {categories.length > 0 && (
                    <div className="flex w-full items-center gap-2">
                        <label htmlFor="category" className="font-semibold whitespace-nowrap">
                            Категория:
                        </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="flex-grow border rounded-lg px-2 py-1 border-gray-300 dark:bg-gray-800 dark:border-gray-500 dark:text-white"
                        >
                            <option value="">Все</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Поиск по заголовку или описанию..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-lg px-3 py-1 border-gray-300 dark:bg-gray-800 dark:border-gray-500 dark:text-white"
                    />
                </div>
            </div>


            {filteredPosts.map((post) => (
                <Link key={post.id} className="block no-underline" href={`posts/${post.slug}`}>
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
            ))}
        </div>
    )
}
