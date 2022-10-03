import React, { useEffect} from 'react'
import axios from "axios";
import { IContact } from '../types/types';
import UserItem from './UserItem';
import List from './List';
import { useAppDispatch, useAppSelector } from '../hook';
import { setContacts, removeContact } from '../store/contactSlice';
import CreateContactForm from './CreateContactForm';
import Search from './Search';

export const ContactsPage: React.FC<{}> = () => {

  const dispatch = useAppDispatch()
  const contactsList = useAppSelector(state => state.contacts.contactsList)
  const isAuth = useAppSelector(state => state.auth.user.accessToken)

  useEffect(() => {
    if (contactsList.length == 0) {
      fetchUsers()
    }
  }, [])

  async function fetchUsers() {
    try {
      const response = await axios.get<IContact[]>('https://jsonplaceholder.typicode.com/users')
      dispatch(setContacts(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  return (
    <div>
      <h1>Список контактов</h1> 
      {isAuth
        ?
        <div>
          <Search />
          <div>
            <CreateContactForm />
          </div>
          <div>
            <List 
            items={contactsList} 
            renderItem={(contact: IContact) => 
            <UserItem contact={contact} key={contact.id} isChangable={true}
            removeContact={() => dispatch(removeContact(contact.id))} />} />
          </div>
        </div>
        : 'Для просмотра и редактирования контактов нужно войти в систему'}
    </div>
  )
};

export default ContactsPage