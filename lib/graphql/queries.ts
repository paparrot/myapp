import { gql } from 'graphql-request';

export const GET_POST_BY_SLUG = gql`
    query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            databaseId
            title
            content
            date
            slug
            excerpt
            featuredImage {
                node {
                    sourceUrl
                }
            }
        }
    }
`;

export const GET_ALL_POST_SLUGS = gql`
    query GetAllPostSlugs {
        posts(first: 100) {
            nodes {
                slug
            }
        }
    }
`;

export const GET_ALL_POSTS = gql`
    query GetPosts {
        posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                id
                title
                excerpt
                slug
                date
                content
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                categories {
                    nodes {
                        name
                    }
                }
                tags {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      content
      slug
    }
  }
`;

export const GET_ALL_PAGE_SLUGS = gql`
  query GetAllPages {
    pages(first: 100) {
      nodes {
        slug
      }
    }
  }
`;
