import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER} from '../../../graphQl/queries';


const Display = () => {
	const { data, loading, error } = useQuery(USER);

	if (loading) return <h4>Loading...</h4>;
	if (error) return <p>ERROR</p>;

	// uppercase Name
	var lowName = data.currentUser.username.toLowerCase()
	// var name = lowName.charAt(0).toUpperCase() + lowName.slice(1)
	var name = lowName.charAt(0).toUpperCase() 
	

	return (
		<div className='user'>
			{data.currentUser && name}
		</div>
	);
};

export default Display;
