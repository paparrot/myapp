import { notFound } from "next/navigation"
import { gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://ksubbotin.ru/graphql');

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      slug
    }
  }
`;

type Props = {
    params: { slug: string[] };
};

type Post = {
    id: string;
    title: string;
    content: string;
    slug: string;
    date: string;
};

export async function generateStaticParams() {
    const data = await client.request<{
        posts: { nodes: { slug: string }[] };
    }>(gql`
    query GetAllPostSlugs {
      posts(first: 100) {
        nodes {
          slug
        }
      }
    }
  `);

    return data.posts.nodes.map((post) => ({
        slug: [post.slug], // 👈 Оборачиваем в массив
    }));
}

export default async function PostPage({ params }: Props) {
    const slug = params.slug.join('/'); // если нужны вложенные пути

    const data = await client.request<{ post: Post | null }>(
        GET_POST_BY_SLUG,
        { slug }
    );

    const post = data.post;

    if (!post) {
        notFound();
    }

    return (
        <article className="py-6 prose dark:prose-invert">
            <h1 className="mb-2" dangerouslySetInnerHTML={{ __html: post.title}} />
            <hr className="my-4"/>
            <div dangerouslySetInnerHTML={{ __html: post.content}}></div>
        </article>
    );
}