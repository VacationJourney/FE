import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloWrapper from './ApolloWrapper'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history'

// export const clear = () => {
// 	client.cache.reset();
// };

ReactDOM.render(
	<Router>
		<Auth0ProviderWithHistory>
			<ApolloWrapper>
				<App />
			</ApolloWrapper>
		</Auth0ProviderWithHistory>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
