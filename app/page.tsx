import Link from "next/link"
import {GraphQLClient, gql} from "graphql-request";

const client = new GraphQLClient('https://api.ksubbotin.ru/graphql');

const query = gql`
  query GetPosts {
    posts(first: 10) {
      nodes {
        id
        title
        excerpt
        slug
        date
      }
    }
  }
`;

type Post = {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
};

export const revalidate = 60;

export default async function Home() {
    const data = await client.request<{ posts: { nodes: Post[] } }>(query);

    return (
        <div className="prose dark:prose-invert">
            {data.posts.nodes.map((post: Post) => (
                <article key={post.id}>
                    <Link href={`posts/${post.slug}`}>
                        <h2 dangerouslySetInnerHTML={{__html: post.title}}/>
                    </Link>
                    <div dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
                </article>
            ))}
        </div>
    )
}