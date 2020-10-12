import gql from 'graphql-tag';

export const CREATE_VACATION = gql`
	mutation createVacation($title: String!, $dates: [DayCreateWithoutTripInput!]) {
		createVacation(data: { title: $title, dates: { create: $dates } }) {
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

export const UPDATE_VACATION = gql`
	mutation updateVacation(
		$id: ID
		$title: String
		$dates: [DayCreateWithoutTripInput!]
		) {
		updateVacation(
			data: { title: $title, dates: { create: $dates } }
			where: {id: $id}
		) {
			id
			title
			dates {
				id
				date
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

export const DELETE_DAY = gql`
	mutation deleteDay($id: ID!) {
  deleteDay(id: $id) {
    id
    date
  }
}
`;