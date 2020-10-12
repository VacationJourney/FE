import gql from 'graphql-tag';

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
				date: { connect: { id: $date } }
				startTime: $startTime
				endTime: $endTime
				location: $location
				contact: $contact
				cost: $cost
				description: $description
			}
		) {
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

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: ID
    $title: String
    $startTime: String
    $endTime: String
    $location: String
    $contact: String
    $cost: Int
    $description: String
    ) {
    updateEvent(
      data: {
        title: $title
        startTime: $startTime
        endTime: $endTime
        location: $location
        contact: $contact
        cost: $cost
        description: $description
      }
      where: { id: $id }
    ) {
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
		deleteEvent( id: $id ) {
			id
			title
		}
	}
`;