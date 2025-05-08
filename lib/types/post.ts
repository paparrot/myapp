export type Post = {
    id: string;
    databaseId: number;
    title: string;
    content: string;
    slug: string;
    date: string;
};

export type Props = {
    params: { slug: string[] };
};