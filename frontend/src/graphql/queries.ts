// graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos($priority: Priority, $status: Status) {
    todos(priority: $priority, status: $status) {
      id
      title
      description
      priority
      status
      createdAt
      updatedAt
      dueDate
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      description
      priority
      status
      createdAt
      updatedAt
      dueDate
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      title
      description
      priority
      status
      createdAt
      updatedAt
      dueDate
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const TOGGLE_STATUS = gql`
  mutation ToggleStatus($id: ID!) {
    toggleStatus(id: $id) {
      id
      status
      updatedAt
    }
  }
`;