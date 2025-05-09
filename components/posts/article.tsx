import { Post } from '@/lib/types/post';

type ArticleProps = {
    post: Post;
    processedContent: React.ReactNode;
};

export default function Article({ post, processedContent }: ArticleProps) {
    return (
        <article className="article__content py-6 overflow-hidden prose dark:prose-invert max-w-none">
            <div className="flex items-center justify-between">
                <h1 className="mb-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
            </div>
            <hr className="my-4" />
            <div>{processedContent}</div>
        </article>
    );
}