export type Term = {
    name: string
}

export type Post = {
    id: string
    title: string
    excerpt: string
    slug: string
    date: string
    content: string
    categories: { nodes: Term[] }
    tags: { nodes: Term[] }
}

export type PostWithFormattedDate = Post & {
    formattedDate: string
}