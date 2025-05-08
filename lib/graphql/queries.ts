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
        }
    }
`;

export const GET_ALL_POSTS = gql`
    query GetAllPosts {
        posts(first: 100, where: { orderby: { field: DATE, order: ASC } }) {
            nodes {
                slug
                title
                date
                excerpt
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