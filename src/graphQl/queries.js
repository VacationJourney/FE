import gql from 'graphql-tag';

export const GET_VACATIONS = gql`
	query vacations($id: ID) {
		vacations(where: { id: $id }) {
			id
			title
			cost
			dates {
				id
				date
				cost
				events {
					id
					title
					cost
					tripId
				}
			}
		}
	}
`


export const GET_ONE_TRIP = gql`
query Vacation($id: ID) {
		vacation(where: { id: $id }) {
			id
			title
			budget
			cost
			dreams
			dates {
				id
				date
				cost
				events{
					id
					title
          startTime
          endTime
          location
          contact
          description
					cost
				}
				notes{
        id
        title
        idea
      }
			}
		}
	}
`;

export const GET_ONE_DATE = gql`
query Day($id: ID) {
  day(where: { id: $id }) {
    id
    date
		cost
    events {
      id
      title
      startTime
      endTime
      description
			cost
    }
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