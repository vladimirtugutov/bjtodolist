import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Form, Input, Button,
} from 'antd';
import {
  PhoneOutlined, UserOutlined, HomeOutlined,
} from '@ant-design/icons';
import * as actions from '../../store/actions/contacts';
import './NewContactForm.css';

export default function NewContactForm() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    if (values) {
      dispatch(actions.addContact(values));
      handleCancel();
    }
  };
  return (
    <>
      <Modal
        onCancel={handleCancel}
        visible={isModalVisible}
        destroyOnClose
        footer={[]}
      >
        <h2>Новый контакт</h2>
        <br />
        <div>
          <Form
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Введите имя!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Введите номер телефона!',
                },
              ]}
            >
              <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Телефон" />
            </Form.Item>
            <Form.Item
              name="contactData"
            >
              <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Другая информация" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Добавить контакт
              </Button>
              {' '}
              <Button type="default" onClick={handleCancel} className="login-form-button">
                Отмена
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div className="containerNewContactForm">
        <Button type="primary" block onClick={() => showModal()}>Добавить контакт</Button>
      </div>
    </>
  );
}
