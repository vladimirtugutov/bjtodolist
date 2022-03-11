import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table, Checkbox, Tag, Space,
} from 'antd';
import NewItemForm from '../NewItemForm';
import EditItemForm from '../EditItemForm';
import * as actions from '../../store/actions/todos';
import './TodoList.css';

const TodoSelector = (state) => state.todoSlice;

export default function TodoList() {
  const dispatch = useDispatch();
  const userSlice = useSelector((store) => store.userSlice);
  const isAuth = userSlice.user?.login;
  const { data: todos } = useSelector(TodoSelector);
  const onChange = (id) => {
    dispatch(actions.toggleTodo(id));
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '10%',
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      width: '20%',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: '20%',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Todo',
      dataIndex: 'text',
      key: 'text',
      align: 'center',
      width: '30%',
      render: (text, todo) => (
        <Space>
          {text}
          {' '}
          <EditItemForm disabled={!isAuth} todo={todo} />
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '10%',
      sorter: (a, b) => (a.status > b.status ? -1 : 1),
      sortDirections: ['descend', 'ascend'],
      render: (status, todo) => (
        <>
          {status ? 'done' : 'in progress'}
          {' '}
          <Checkbox
            checked={status}
            disabled={!isAuth}
            onChange={() => onChange(todo.id)}
          />
        </>
      ),
    },
    {
      title: 'Notes',
      dataIndex: 'edited',
      key: 'edited',
      align: 'center',
      width: '10%',
      render: (edited) => (
        <Tag visible={edited}> Edited by admin</Tag>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actions.initTodos());
  }, [dispatch]);

  return (
    <>
      <h1 className="containerList">TodoList</h1>
      <div className="containerList">
        <NewItemForm />
      </div>
      <br />
      <div className="container">
        <Table
          dataSource={todos}
          columns={columns}
          pagination={{ pageSize: 3 }}
          rowKey="id"
        />
      </div>
    </>
  );
}
