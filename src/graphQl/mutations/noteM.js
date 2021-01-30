import gql from 'graphql-tag';

export const CREATE_NOTE = gql`
  mutation createNote($title: String!, $idea: String, $date: ID, $vacation: ID) {
    createNote(
      data: {
        title: $title
        idea: $idea
        trip: { connect: { id: $vacation } }
        date: { connect: { id: $date } }
      }
    ) {
      id
      title
      idea
    }
  }
`
export const UPDATE_NOTE = gql`
  mutation updateNote($title: String, $idea: String, $id: ID) {
    updateNote(data: { title: $title, idea: $idea }, where: { id: $id }) {
      id
      title
      idea
    }
  }
`
export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(where: { id: $id }) {
      id
      title
      idea
    }
  }
`