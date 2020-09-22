import gql from 'graphql-tag';

export const SIGN_UP = gql`
	mutation signUp($username: String!, $email: String, $password: String!) {
		signUp(username: $username, email: $email, password: $password) {
			
			... on User {
				username
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

export const USER = gql`
	{
		currentUser {
			id
			username
			email
		}
	}
`;

export const USER_UPDATE = gql`
	mutation UserUpdate(
		$id: ID!
		$username: String
		$email: String
		$password: String
	) {
		userUpdate(
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

export const CREATE_VACATION = gql`
	mutation CreateVacation(
		$title: String!
		$dates: DayCreateManyWithoutTripInput!
		$traveler: ID!
	) {
		createVacation(
			data: {
				title: $title
				dates: $dates
				traveler: { connect: { id: $traveler } }
			}
		) {
			id
			title
			dates {
				id
				date
				events {
					id
					title
				}
			}
		}
	}
`;

export const GET_VACATIONS = gql`
	{
		vacations {
			id
			title
			dates {
				date
			}
		}
	}
`;

export const GET_ONE_TRIP = gql`
	query Vacation($id: ID) {
		vacation(where: { id: $id }) {
			id
			title
			dates {
				id
				date
				events {
					id
					title
				}
			}
		}
	}
`;

export const EDIT_VACATION = gql`
	mutation UpdateVacation(
		$title: String
		$dates: DayUpdateManyWithoutTripInput
		$traveler: ID
		$id: ID
	) {
		updateVacation(
			data: {
				title: $title
				dates: $dates
				traveler: { connect: { id: $traveler } }
			}
			where: { id: $id }
		) {
			id
			title
		}
	}
`;

export const DELETE_VACATION = gql`
	mutation DeleteVacation($id: ID) {
		deleteVacation(where: { id: $id }) {
			id
			title
		}
	}
`;

export const GET_ONE_DATE = gql`
	query Day($id: ID) {
		day(where: { id: $id }) {
			id
			date
			events {
				id
				title
				startTime
				endTime
				description
			}
		}
	}
`;

export const DELETE_DAY = gql`
	mutation DeleteDay($id: ID!) {
		deleteDay(where: { id: $id }) {
			id
			date
		}
	}
`;

export const CREATE_EVENT = gql`
	mutation CreateEvent(
		$title: String!
		$startTime: String
		$endTime: String
		$location: String
		$contact: String
		$cost: Int
		$description: String
		$date: ID!
	) {
		createEvent(
			data: {
				title: $title
				startTime: $startTime
				endTime: $endTime
				location: $location
				contact: $contact
				cost: $cost
				description: $description
				date: { connect: { id: $date } }
			}
		) {
			id
			title
			startTime
			endTime
			location
			description
		}
	}
`;

export const GET_ONE_EVENT = gql`
	query Event($id: ID) {
		event(where: { id: $id }) {
			id
			title
			startTime
			endTime
			location
			contact
			cost
			description
		}
	}
`;

export const DELETE_EVENT = gql`
	mutation DeleteEvent($id: ID!) {
		deleteEvent(where: { id: $id }) {
			id
			title
		}
	}
`;
