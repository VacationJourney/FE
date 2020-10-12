import gql from 'graphql-tag';

export const SIGN_UP = gql`
	mutation signUp($username: String!, $email: String, $password: String!) {
		signUp(username: $username, email: $email, password: $password) {
			
			... on SignUpResponse {
				token 
				user{
					username
				}
			}
			... on UserFoundError {
				message
			}
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				username
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser(
		$id: ID!
		$username: String
		$email: String
		$password: String
	) {
		updateUser(
			username: $username
			email: $email
			password: $password
			id: $id
		) {
			id
			username
			email
		}
	}
`;

export const DELETE_USER = gql`
	mutation deleteUser($id: ID!) {
		deleteUser(id: $id) {
			id
			username
		}
	}
`;