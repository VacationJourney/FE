import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from "@auth0/auth0-react";

const ApolloWrapper = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const history = useHistory()
  const [bearerToken, setBearerToken] = useState("")
  const httpLink = new createHttpLink({
    uri: process.env.REACT_APP_ENDPOINT || 'http://localhost:4000/',
  });

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : ""
      setBearerToken(token)
    }
    getToken()
  }, [isAuthenticated, getAccessTokenSilently])

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: bearerToken ? `Bearer ${bearerToken}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        if (message.includes('not authenticated')) {
          return history.push('/');
        }
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
  });

  // export const clear = () => {
  //   client.cache.reset();
  // };

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloWrapper
