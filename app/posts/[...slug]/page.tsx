import {notFound} from 'next/navigation';
import {client} from '@/lib/graphql/client';
import {GET_POST_BY_SLUG, GET_ALL_POSTS} from '@/lib/graphql/queries';
import {Props, Post} from '@/lib/types/post';
import {processContent} from '@/lib/utils/content';
import Article from '@/components/posts/article';
import PostNavigation from '@/components/posts/navigation';
import LikeButton from '@/components/posts/like-button';
import CommentForm from '@/components/posts/comment-form';
import Comments from '@/components/posts/comment-list';
import {Metadata} from "next";

const stripHtml = (html: string): string => {
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug.join('/');
    try {
        const data = await client.request<{ post: Post | null }>(GET_POST_BY_SLUG, { slug });
        const post = data.post;

        if (!post) {
            return {
                title: 'Пост не найден',
                description: 'Страница не найдена',
            };
        }

        const description = stripHtml(post.excerpt);

        return {
            title: `${post.title} | Paparrot`,
            description,
            openGraph: {
                title: post.title,
                description,
                url: `https://ksubbotin.ru/posts/${post.slug}`,
                type: 'article',
                publishedTime: post.date,
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description,
            },
        };
    } catch (err) {
        console.error('Error generating metadata:', err);
        return {
            title: 'Ошибка',
            description: 'Не удалось загрузить пост',
        };
    }
}

export const revalidate: number = 60;

export default async function PostPage({params}: Props) {
    const slug = params.slug.join('/');
    try {
        const data = await client.request<{ post: Post | null }>(GET_POST_BY_SLUG, {slug});
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

        const processedContent = processContent(post.content);

        return (
            <div className="space-y-6">
                <Article post={post} processedContent={processedContent}/>
                <LikeButton postId={post.databaseId} postSlug={post.slug} postTitle={post.title}/>
                <PostNavigation prevPost={prevPost} nextPost={nextPost}/>
                <CommentForm postId={post.databaseId}/>
                <Comments postId={post.databaseId}/>
            </div>
        );
    } catch (err) {
        console.error('Error fetching post:', err);
        notFound();
    }
}