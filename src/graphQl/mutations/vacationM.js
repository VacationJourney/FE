import gql from 'graphql-tag';

export const CREATE_VACATION = gql`
	mutation createVacation(
		$title: String!
		$budget: Int
		$dates: [DayCreateWithoutTripInput!]
		$id: ID
	) {
		createVacation(
			data: {
				title: $title
				budget: $budget
				dates: { create: $dates }
				traveler: { connect: { id: $id } }
			}
		) {
			id
			title
			budget
		}
	}
`;

export const UPDATE_VACATION = gql`
mutation updateVacation(
  $id: ID
  $title: String
  $budget: Int
  $dreams: String
) {
  updateVacation(
    data: { title: $title, budget: $budget, dreams: $dreams }
    where: { id: $id }
  ) {
    id
    title
    budget
    cost
    dates(orderBy:date_DESC ) {
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

export const UPDATE_DAY_COST = gql`
	mutation updateDayCost( $id: ID!) {
		updateDayCost( where: { id: $id }) {
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
`;

export const UPDATE_VACATION_COST = gql`
	mutation updateVacationCost( $id: ID!){
		updateVacationCost( where: {id: $id}){
			id
			title
			cost
			dates{
				date
				cost
			}
		}
	}
`

export const CREATE_DAY = gql`
	mutation createDay($tripId: ID, $date: String!, $cost: Int) {
		createDay(
			data: { date: $date, cost: $cost, trip: { connect: { id: $tripId } } }
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