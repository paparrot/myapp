export type Post = {
    id: string;
    databaseId: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    date: string;
};

export type Props = {
    params: { slug: string[] };
};