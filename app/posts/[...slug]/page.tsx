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