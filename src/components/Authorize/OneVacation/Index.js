import React from 'react';

import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../../utils/PrivateRoute'
import OneVacation from './OneVacation'
import UpdateVacation from '../UpdateVacation'

const Index = ({userId}) => {
	let { path } = useRouteMatch();

	return (
		
			<Switch>
				<PrivateRoute exact path={ `${path}` }>
					<OneVacation userId={userId}/>
				</PrivateRoute>
				<PrivateRoute path={ `${path}/update` }>
					<UpdateVacation />
				</PrivateRoute>
			</Switch>
		
	);
};

export default Index;

