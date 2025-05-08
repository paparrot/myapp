import { client } from '@/lib/graphql/client';
import { GET_ALL_POST_SLUGS } from '@/lib/graphql/queries';

export async function generateStaticParams() {
    const data = await client.request<{
        posts: { nodes: { slug: string }[] };
    }>(GET_ALL_POST_SLUGS);

    return data.posts.nodes.map((post) => ({
        slug: [post.slug],
    }));
}