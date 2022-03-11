import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Space, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserStart } from '../../store/actions/user';
import './Navigation.css';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSlice = useSelector((store) => store.userSlice);
  const isAuth = userSlice.user?.login;

  function logout() {
    try {
      dispatch(logoutUserStart());
      navigate('/');
    } catch (error) {
      navigate('/error');
    }
  }

  return (
    <>
      <nav className="navbar">
        <Space direction="horizontal" align="center" size="large">
          <Button className="title-fint-adler" type="link" onClick={() => navigate('/')}>
            Main
          </Button>
          {isAuth ? (
            <Row>
              <Button className="title-fint-adler" type="link">
                Welcome,
                {' '}
                {isAuth}
              </Button>
              <Button className="title-fint-adler" type="link" onClick={() => logout()}>
                Logout
              </Button>
            </Row>
          )
            : (
              <Button className="title-fint-adler" type="link" onClick={() => navigate('/signin')}>
                Login
              </Button>
            )}
        </Space>
      </nav>
      <Outlet />
    </>
  );
}
