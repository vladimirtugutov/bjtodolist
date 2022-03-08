import {
  Form, Input, Button, Row,
} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions/user';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(actions.regUserStart(values));
    navigate('/');
    form.resetFields();
  };
  return (
    <div className="Signup">
      <h1 className="containerContactList">Регистрация нового пользователя</h1>
      <Row justify="center" align="middle">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          onReset
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Введите Ваш email' }]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Введите Вашe имя' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Имя"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите Ваш пароль' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="login-form-button">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
}
