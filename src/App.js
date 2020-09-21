import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Splash from './components/Display/Splash';
import Register from './components/Auth/Register';
import Settings from './components/Display/Settings'
import Dashboard from './components/Display/Dashboard';
import OneVacation from './components/Display/OneVacation';
import UpdateVacation from './components/Display/UpdateVacation';
import OneDay from './components/Display/OneDay';
import OneEvent from './components/Display/OneEvent';

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
				<PrivateRoute path='/settings'>
					<Settings />
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
