import {notFound} from "next/navigation"
import {gql, GraphQLClient} from 'graphql-request';
import Link from "next/link";
import CommentForm from "@/components/comment-form";
import Comments from "@/components/comment-list";
import LikeButton from "@/components/like-button";


const client = new GraphQLClient('https://api.ksubbotin.ru/graphql');

const GET_POST_BY_SLUG = gql`
    query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            databaseId
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
    databaseId: number;
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
        <div className={"space-y-6"}>
            <article className="py-6 overflow-hidden prose dark:prose-invert">
                <div className="flex items-center justify-between">
                    <h1 className="mb-2" dangerouslySetInnerHTML={{__html:  post.title }}/>
                    <span>
                        {new Date(post.date).toLocaleDateString('ru-RU')}
                    </span>
                </div>
                <hr className="my-4"/>
                <div dangerouslySetInnerHTML={{__html: post.content}}></div>
            </article>
            <LikeButton postId={post.databaseId} postSlug={post.slug} postTitle={post.title}/>
            <nav className="gap-2 grid grid-cols-1 md:grid-cols-2 text-sm">
                {prevPost ? (
                    <Link href={`/posts/${prevPost.slug}`}
                          className="flex no-underline bg-gray-50 dark:bg-gray-800 text-center justify-center w-full border border-gray-300 dark:border-slate-500 px-3 py-4 rounded-xl">
                        Предыдущий пост: {prevPost.title}
                    </Link>
                ) : <span/>}
                {nextPost ? (
                    <Link href={`/posts/${nextPost.slug}`}
                          className="flex no-underline bg-gray-50 dark:bg-gray-800 text-center justify-center w-full border border-gray-300 dark:border-slate-500 px-3 py-4 rounded-xl">
                        Следующий пост: {nextPost.title}
                    </Link>
                ) : <span/>}
            </nav>
            <CommentForm postId={post.databaseId}/>
            <Comments postId={post.databaseId}/>
        </div>
    );
}