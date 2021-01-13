import gql from 'graphql-tag';

export const AUTHORIZE_USER = gql`
	mutation authorizeUser($username: String, $email: String!) {
		authorizeUser(username: $username, email: $email) {
			id
			username
			email
		}
	}
`;




