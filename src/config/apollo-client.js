import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql', 
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`, 
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
