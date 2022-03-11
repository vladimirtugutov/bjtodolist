import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types/todos';
import * as actions from '../actions/todos';

function* addTodo(action) {
  const { payload } = action;
  const { userName, email, text } = payload;
  try {
    const { data: id } = yield call(axios.post, 'http://localhost:5000/api/todos', { userName, email, text });
    // eslint-disable-next-line no-alert
    alert('New todo added successfully!');
    yield put(actions.addTodoSuccess({
      id, userName, email, text,
    }));
  } catch (e) {
    yield put(actions.addTodoError(e));
  }
}

function* editTodo(action) {
  const {
    id, text,
  } = action.payload;
  try {
    const { data } = yield call(() => axios.get('http://localhost:5000/api/auth/check', { withCredentials: true }));
    if (data === 'не авторизован!') {
      // eslint-disable-next-line no-alert
      alert('You have to log in!');
    } else if (data?.id === 1) {
      const { status } = yield call(axios.put, `http://localhost:5000/api/todos/${id}`, { text });
      if (status === 200) {
        yield put(actions.editTodoSuccess({ id, text }));
      }
    }
  } catch (e) {
    yield put(actions.editTodoError(e));
  }
}

function* initTodos() {
  try {
    const { data } = yield call(axios.get, 'http://localhost:5000/api/todos');
    yield put(actions.initTodosSuccess({ data }));
  } catch (e) {
    yield put(actions.initTodosError(e));
  }
}

function* toggleTodo(action) {
  const { payload } = action;
  try {
    const { data } = yield call(() => axios.get('http://localhost:5000/api/auth/check', { withCredentials: true }));
    if (data === 'не авторизован!') {
      // eslint-disable-next-line no-alert
      alert('You have to log in!');
    } else if (data?.id === 1) {
      const { status } = yield call(axios.patch, `http://localhost:5000/api/todos/${payload}`);
      if (status === 200) {
        yield put(actions.toggleTodoSuccess(payload));
      }
    }
  } catch (e) {
    yield put(actions.toggleTodoError(e));
  }
}

export default function* todoSaga() {
  yield takeEvery(types.CREATE_TODO, addTodo);
  yield takeEvery(types.EDIT_TODO, editTodo);
  yield takeEvery(types.INIT_TODO, initTodos);
  yield takeEvery(types.TOGGLE_TODO, toggleTodo);
}
