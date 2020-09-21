import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER} from '../../graphQl/Index';
import { Typography } from '@material-ui/core';

const Display = () => {
	const { data, loading, error } = useQuery(USER);

	if (loading) return <h4>Loading...</h4>;
	if (error) return <p>ERROR</p>;


	return (
		<div>
			<Typography key={data.currentUser.id} variant='h3'>
				{data.currentUser && data.currentUser.username}
			</Typography>
		</div>
	);
};

export default Display;
