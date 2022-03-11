import * as types from '../types/todos';

export const addTodo = (payload) => ({
  type: types.CREATE_TODO,
  payload,
});

export const addTodoError = (payload) => ({
  type: types.CREATE_TODO_ERROR,
  payload,
  error: true,
});

export const addTodoSuccess = (payload) => ({
  type: types.CREATE_TODO_SUCCESS,
  payload,
});

export const initTodos = () => ({
  type: types.INIT_TODO,
});

export const initTodosError = (payload) => ({
  type: types.INIT_TODO_ERROR,
  payload,
  error: true,
});

export const initTodosSuccess = (payload) => ({
  type: types.INIT_TODO_SUCCESS,
  payload,
});

export const editTodo = (payload) => ({
  type: types.EDIT_TODO,
  payload,
});

export const editTodoSuccess = (payload) => ({
  type: types.EDIT_TODO_SUCCESS,
  payload,
});

export const editTodoError = (payload) => ({
  type: types.EDIT_TODO_ERROR,
  payload,
  error: true,
});

export const toggleTodo = (payload) => ({
  type: types.TOGGLE_TODO,
  payload,
});

export const toggleTodoSuccess = (payload) => ({
  type: types.TOGGLE_TODO_SUCCESS,
  payload,
});

export const toggleTodoError = (payload) => ({
  type: types.TOGGLE_TODO_ERROR,
  payload,
  error: true,
});
