import Home from '@/components/home'
import { client } from '@/lib/graphql/client'
import { GET_ALL_POSTS } from '@/lib/graphql/queries'
import { Post } from '@/lib/types/post-list'

export const revalidate = 60

export default async function Page() {
    const data = await client.request<{ posts: { nodes: Post[] } }>(GET_ALL_POSTS)

    const posts = data.posts.nodes.map(post => ({
        ...post,
        formattedDate: new Date(post.date).toLocaleDateString('ru-RU')
    }))

    return <Home posts={posts} />
}
