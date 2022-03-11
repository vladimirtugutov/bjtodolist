import { all } from 'redux-saga/effects';
import todoSaga from './todos';
import userSaga from './user';

export default function* rootSaga() {
  yield all([userSaga(), todoSaga()]);
}
