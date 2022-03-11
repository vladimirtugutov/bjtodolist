import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import Navigation from './components/Navigation';
import Signin from './components/Auth/Signin';

import * as actionsUser from './store/actions/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsUser.checkAuthStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<TodoList />} />

        <Route path="signin" element={<Signin />} />
      </Route>
    </Routes>
  );
}

export default App;
