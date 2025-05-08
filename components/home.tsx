'use client'

import { useMemo, useState } from 'react'
import { PostWithFormattedDate } from '@/lib/types/post-list'
import PostFilters from './posts/post-filters'
import PostCard from './posts/post-card'

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
            <PostFilters
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                search={search}
                setSearch={setSearch}
            />
            {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
