import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Modal, Form, Input, Button,
} from 'antd';
import {
  EditOutlined, DeleteOutlined, PhoneOutlined, UserOutlined, HomeOutlined,
} from '@ant-design/icons';
import * as actions from '../../store/actions/contacts';

export default function ContactItem({ contact }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const deleteHandler = () => {
    dispatch(actions.deleteContact(contact.id));
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    if (values) {
      const { id } = contact;
      const newPayload = { ...values, id };
      dispatch(actions.editContact(newPayload));
      handleCancel();
    }
  };
  return (
    <>
      <Modal
        onCancel={handleCancel}
        visible={isModalVisible}
        footer={[]}
      >
        <h2>Редактирование контакта</h2>
        <br />
        <div>
          <Form
            onFinish={onFinish}
            initialValues={{
              name: contact.name,
              phone: contact.phone,
              contactData: contact.contactData,
            }}
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
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={contact.name} />
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
              <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder={contact.phone} />
            </Form.Item>
            <Form.Item
              name="contactData"
            >
              <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder={contact.contactData} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Сохранить данные
              </Button>
              {' '}
              <Button type="default" onClick={handleCancel} className="login-form-button">
                Отмена
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Card
        title={contact.name}
        style={{ width: 300 }}
        headStyle={{ backgroundColor: '#fffb8f', border: 0 }}
        bodyStyle={{ backgroundColor: '#ffffb8', border: 0 }}
        actions={[
          <EditOutlined key="edit" onClick={() => showModal()} />,
          <DeleteOutlined key="delete" onClick={() => deleteHandler(contact.id)} />,
        ]}
      >
        <p>
          <PhoneOutlined />
          {' '}
          {contact.phone}
        </p>
        <p>
          <HomeOutlined />
          {' '}
          {contact.contactData}
        </p>
      </Card>
      <br />
    </>
  );
}
