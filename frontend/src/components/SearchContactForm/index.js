import { useDispatch } from 'react-redux';
import {
  Form, Input, Button,
} from 'antd';
import * as actions from '../../store/actions/contacts';
import './SeacrhContactForm.css';

const { Search } = Input;

export default function SearchContactForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onSearch = (values) => {
    if (values) {
      dispatch(actions.searchContacts(values));
    }
  };
  const resetSearchResults = () => {
    dispatch(actions.initContacts());
    form.resetFields(['textField']);
  };
  return (
    <div className="containerSearchContactForm">
      <Form form={form}>
        <Form.Item name="textField">
          <Search placeholder="Поиск контактов" enterButton allowClear onSearch={onSearch} />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={() => resetSearchResults()}>Сбросить результаты</Button>
    </div>
  );
}
