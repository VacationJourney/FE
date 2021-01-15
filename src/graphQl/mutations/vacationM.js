import gql from 'graphql-tag';

export const CREATE_VACATION = gql`
	mutation createVacation(
		$title: String!
		$budget: Int
		$dates: [DayCreateWithoutTripInput!]
		$userId: ID
	) {
		createVacation(
			data: {
				title: $title
				budget: $budget
				dates: { create: $dates }
				traveler: {connect: {id: $userId}}
			}
		) {
			id
			title
			budget
			dates{
				id
				date
			}
		}
	}
`;

export const UPDATE_VACATION = gql`
	mutation updateVacation(
		$id: ID
		$title: String
		$budget: Int
	) {
		updateVacation(
			data: { title: $title, budget: $budget }
			where: { id:  $id }
		) {
			id
			title
			budget
			cost
			dates {
				id
				date
				cost
				events {
					id
					title
					cost
				}
			}
		}
	}
`;

export const DELETE_VACATION = gql`
	mutation deleteVacation($id: ID!) {
		deleteVacation(id: $id) {
			id
			title
		}
	}
`;


export const CREATE_DAY = gql`
	mutation createDay($tripId: ID, $date: String!, $cost: Int) {
		createDay(
			data: { trip: { connect: { id: $tripId } }, date: $date, cost: $cost }
		) {
			id
			date
			cost
			events {
				id
				title
				cost
			}
		}
	}
`

export const DELETE_DAY = gql`
	mutation deleteDay($id: ID! $tripId: ID!) {
		deleteDay(id: $id, tripId: $tripId) {
			id
			date
		}
	}
`;