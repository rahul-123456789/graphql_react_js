import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create an HTTP link to your GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql', // Replace with your GraphQL API endpoint
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
