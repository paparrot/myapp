import {notFound} from "next/navigation"
import {gql, GraphQLClient} from 'graphql-request';
import Link from "next/link";

const client = new GraphQLClient('https://api.ksubbotin.ru/graphql');

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

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100, where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        slug
        title
        date
      }
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

export default async function PostPage({params}: Props) {
    const slug = params.slug.join('/'); // если нужны вложенные пути

    const data = await client.request<{ post: Post | null }>(
        GET_POST_BY_SLUG,
        {slug}
    );

    const post = data.post;

    if (!post) {
        notFound();
    }

    const allPostsData = await client.request<{
        posts: { nodes: Post[] };
    }>(GET_ALL_POSTS);

    const sortedPosts = allPostsData.posts.nodes.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
    const prevPost = sortedPosts[currentIndex - 1] ?? null;
    const nextPost = sortedPosts[currentIndex + 1] ?? null;

    return (
        <article className="py-6 overflow-hidden prose dark:prose-invert">
            <h1 className="mb-2" dangerouslySetInnerHTML={{__html: post.title}}/>
            <hr className="my-4"/>
            <div dangerouslySetInnerHTML={{__html: post.content}}></div>

            <nav className="mt-10 flex justify-between text-sm">
                {prevPost ? (
                    <Link href={`/posts/${prevPost.slug}`} className="flex text-center justify-center w-full md:w-1/2 border px-3 py-3 rounded-lg">
                        Предыдущий пост: {prevPost.title}
                    </Link>
                ) : <span/>}
                {nextPost ? (
                    <Link href={`/posts/${nextPost.slug}`} className="flex text-center justify-center w-full md:w-1/2 border px-3 py-3 rounded-lg">
                        Следующий пост: {nextPost.title}
                    </Link>
                ) : <span/>}
            </nav>
        </article>
    );
}