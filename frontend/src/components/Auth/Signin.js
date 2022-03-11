import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Form, Input, Button, Row,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as actions from '../../store/actions/user';

const Signin = () => {
  const userSlice = useSelector((store) => store.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userSlice.user?.login) {
      navigate('/');
    }
  }, [userSlice.user]);

  const onFinish = (values) => {
    if (values) {
      dispatch(actions.authUserStart(values));
    }
  };
  return (
    <div className="Auth">
      <h1 className="containerList">User authorization</h1>
      <Row justify="center" align="middle">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                message: 'Please enter your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="login" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
};

export default Signin;
