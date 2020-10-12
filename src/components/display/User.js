import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER} from '../../graphQl/queries';
import { Typography } from '@material-ui/core';

const Display = () => {
	const { data, loading, error } = useQuery(USER);

	if (loading) return <h4>Loading...</h4>;
	if (error) return <p>ERROR</p>;

	// uppercase Name
	var lowName = data.currentUser.username.toLowerCase()
	var name = lowName.charAt(0).toUpperCase() + lowName.slice(1)
	

	return (
		<div>
			<Typography key={data.currentUser.id} variant='h3'>
				{data.currentUser && name}
			</Typography>
		</div>
	);
};

export default Display;
