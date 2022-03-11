import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Form, Input, Button, notification,
} from 'antd';
import {
  UserOutlined, FileTextOutlined, MailOutlined,
} from '@ant-design/icons';
import * as actions from '../../store/actions/todos';
import './NewItemForm.css';

export default function NewItemForm() {
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
      dispatch(actions.addTodo(values));
      notification.open({
        message: 'New Todo is being added',
        description:
          `user: ${values.userName},
          email: ${values.email},
          text:  ${values.text}`,
        onClick: () => {
          notification.destroy();
        },
        duration: 2,
      });
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
        <h2>New todo</h2>
        <br />
        <div>
          <Form
            onFinish={onFinish}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: 'Please enter username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter email!',
                },
                { pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, message: 'Please enter a valid email!' },
              ]}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="text"
              rules={[
                {
                  required: true,
                  message: 'Please enter todo text!',
                },
              ]}
            >
              <Input prefix={<FileTextOutlined className="site-form-item-icon" />} placeholder="Todo text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
              {' '}
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div className="containerNewItemForm">
        <Button type="primary" block onClick={() => showModal()}>Add todo</Button>
      </div>
    </>
  );
}
