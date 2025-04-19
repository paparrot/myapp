// app/pages/[slug]/page.tsx
import { notFound } from "next/navigation";
import { GraphQLClient } from "graphql-request";
import { GET_PAGE_BY_SLUG, GET_ALL_PAGE_SLUGS } from "@/lib/queries/pages";

const client = new GraphQLClient("https://api.ksubbotin.ru/graphql");

type Props = {
  params: { slug: string };
};

type Page = {
  id: string;
  title: string;
  content: string;
  slug: string;
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  const data = await client.request<{ page: Page | null }>(
      GET_PAGE_BY_SLUG,
      { slug }
  );

  const page = data.page;

  if (!page) {
    notFound();
  }

  return (
      <article className="py-6 prose dark:prose-invert">
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
  );
}

export async function generateStaticParams() {
  const data = await client.request<{
    pages: { nodes: { slug: string }[] };
  }>(GET_ALL_PAGE_SLUGS);

  return data.pages.nodes.map((page) => ({
    slug: page.slug,
  }));
}

