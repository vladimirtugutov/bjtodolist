import { combineReducers } from 'redux';
import todoReducer from './todos';
import userReducer from './user';

const reducerSpec = {
  todoSlice: todoReducer,
  userSlice: userReducer,
};

const rootReducer = combineReducers(reducerSpec);

export default rootReducer;
