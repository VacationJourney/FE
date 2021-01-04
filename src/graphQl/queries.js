import gql from 'graphql-tag';

export const USER = gql`
	{
		currentUser {
			id
			username
			email
			password
		}
	}
`;

export const GET_VACATIONS = gql`
	{
		vacations {
			id
			title
			budget
			cost
			dates {
				date
				cost
			}
		}
	}
`;

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
				events(orderBy: startTime_ASC){
					id
					title
          startTime
          endTime
          location
          contact
          description
					cost
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