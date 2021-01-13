import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import Splash from './components/Splash/Index';
import Dashboard from './components/Authorize/Index';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/'>
					<Splash />
				</Route>
				<PrivateRoute path='/vacations'>
					<Dashboard />
				</PrivateRoute>
			</Switch>
		</div>
	);
}

export default App;
