import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import ContactItem from '../ContactItem';
import NewContactForm from '../NewContactForm';
import SearchContactForm from '../SearchContactForm';
import * as actions from '../../store/actions/contacts';
import './ContactList.css';

const ContactSelector = (state) => state.contactSlice;

export default function ContactList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSlice = useSelector((store) => store.userSlice);
  const { data: contacts } = useSelector(ContactSelector);
  const isAuth = userSlice.user?.username;

  useEffect(() => {
    dispatch(actions.initContacts());
  }, [dispatch]);

  if (isAuth) {
    return (
      <>
        <h1 className="containerContactList">Список контактов</h1>
        <div className="containerContactList">
          <SearchContactForm />
        </div>
        <div className="containerContactList">
          <NewContactForm />
        </div>
        <br />
        <div className="containerContacts">
          {contacts.map((contact) => (
            <Row justify="center" key={String(contact.id)}>
              <Col>
                <ContactItem
                  contact={contact}
                />
              </Col>
            </Row>
          ))}
        </div>

      </>
    );
  }

  return (
    <>
      <h1 className="containerContactList">Необходимо авторизоваться!</h1>
      <h1 className="containerContactList">Страница со списком контактов пользователя доступна только после авторизации.</h1>
      <Row justify="center">
        <Button type="primary" onClick={() => navigate('/signin')}>Страница авторизации</Button>
      </Row>
    </>
  );
}
