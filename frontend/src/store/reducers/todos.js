import * as types from '../types/todos';

export default function todoReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_TODO: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.CREATE_TODO_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = [...newState.data, payload];
      return newState;
    }

    case types.CREATE_TODO_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.INIT_TODO: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.INIT_TODO_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.INIT_TODO_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload.data;
      return newState;
    }

    case types.EDIT_TODO: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.EDIT_TODO_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = newState.data.map((todo) => {
        if (todo.id === payload.id) {
          // eslint-disable-next-line no-param-reassign
          todo.text = payload.text;
          // eslint-disable-next-line no-param-reassign
          todo.edited = true;
        }
        return todo;
      });
      return newState;
    }

    case types.EDIT_TODO_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.TOGGLE_TODO_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = newState.data.map((todo) => {
        if (todo.id === payload) {
          // eslint-disable-next-line no-param-reassign
          todo.status = !todo.status;
        }
        return todo;
      });
      return newState;
    }

    default: {
      return state;
    }
  }
}
