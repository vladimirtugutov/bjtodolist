import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Form, Input, Button,
} from 'antd';
import {
  EditOutlined, FileTextOutlined,
} from '@ant-design/icons';
import * as actions from '../../store/actions/todos';

export default function EditItemForm({ todo }) {
  const dispatch = useDispatch();
  const userSlice = useSelector((store) => store.userSlice);
  const isAuth = userSlice.user?.login;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    if (values) {
      const { id } = todo;
      const newPayload = { ...values, id };
      dispatch(actions.editTodo(newPayload));
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
        <h2>Edit todo</h2>
        <br />
        <div>
          <Form
            onFinish={onFinish}
            initialValues={{ text: todo.text }}
          >
            <Form.Item
              name="text"
            >
              <Input prefix={<FileTextOutlined className="site-form-item-icon" />} placeholder={todo.text} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              {' '}
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div>
        <Button disabled={!isAuth} onClick={() => showModal()}>
          <EditOutlined />
        </Button>
      </div>
    </>
  );
}
