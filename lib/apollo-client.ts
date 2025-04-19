// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.ksubbotin.ru/graphql', // Твой WPGraphQL endpoint
    cache: new InMemoryCache(),
});

export default client;
