import {gql} from 'graphql-request';

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
