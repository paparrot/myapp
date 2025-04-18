// lib/queries.ts
import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts(first: 10) {
      nodes {
        id
        title
        excerpt
        slug
        date
      }
    }
  }
`;
