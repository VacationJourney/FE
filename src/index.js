import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = new createHttpLink({
	uri: process.env.REACT_APP_ENDPOINT || 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		console.log(`[GraphQL error]: ${graphQLErrors}`);
	}
	if (networkError) {
		console.log(`[Network error]: ${networkError}`);
	}
});

const client = new ApolloClient({
	link: errorLink.concat(authLink.concat(httpLink)),
	cache: new InMemoryCache(),
});

export const clear = () => {
	client.cache.reset();
};

const ApolloApp = () => (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<ApolloApp />
		</React.StrictMode>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
