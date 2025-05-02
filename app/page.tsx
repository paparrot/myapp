// app/page.tsx или app/posts/page.tsx (серверный)
import Home from '@/components/home'
import { GraphQLClient, gql } from 'graphql-request'

const client = new GraphQLClient('https://api.ksubbotin.ru/graphql')

const query = gql`
    query GetPosts {
        posts(first: 100) {
            nodes {
                id
                title
                excerpt
                slug
                date
                content
                categories {
                    nodes {
                        name
                    }
                }
                tags {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`

export const revalidate = 60

type Term = { name: string }

type Post = {
    id: string
    title: string
    excerpt: string
    slug: string
    date: string
    formattedDate: string
    content: string
    categories: { nodes: Term[] }
    tags: { nodes: Term[] }
}

type PostWithFormattedDate = Post & {
    formattedDate: string
}

export default async function Page() {
    const data = await client.request<{ posts: { nodes: Post[] } }>(query)

    const posts = data.posts.nodes.map(post => ({
        ...post,
        formattedDate: new Date(post.date).toLocaleDateString('ru-RU')
    }))

    return <Home posts={posts} />
}
