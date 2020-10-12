import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Splash from './components/display/Splash';
import Register from './components/auth/Register';
import Profile from './components/display/Profile'
import Dashboard from './components/display/Dashboard';
import OneVacation from './components/display/OneVacation';
import UpdateVacation from './components/display/UpdateVacation';
import OneDay from './components/display/OneDay';
import OneEvent from './components/display/OneEvent';

import PrivateRoute from './utils/PrivateRoute';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/register'>
					<Register />
				</Route>
				<Route exact path='/'>
					<Splash />
				</Route>
				<PrivateRoute path='/dashboard'>
					<Dashboard />
				</PrivateRoute>
				<PrivateRoute path='/profile'>
					<Profile />
				</PrivateRoute>
				<PrivateRoute path='/vacationUpdate/:id'>
					<UpdateVacation />
				</PrivateRoute>
				<PrivateRoute path='/vacation/:id'>
					<OneVacation />
				</PrivateRoute>
				<PrivateRoute path='/day/:id'>
					<OneDay />
				</PrivateRoute>
				<PrivateRoute path='/event/:id'>
					<OneEvent />
				</PrivateRoute>
			</Switch>
		</div>
	);
}

export default App;
