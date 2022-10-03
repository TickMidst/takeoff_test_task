import React, { useState, useEffect } from 'react'
import { IContact } from '../types/types';
import UserItem from './UserItem';
import List from './List';
import { useAppDispatch, useAppSelector } from '../hook';
import { removeContact } from '../store/contactSlice';
import './Search.css'

export const Search: React.FC<{}> = () => {

  const contactsList = useAppSelector(state => state.contacts.contactsList)

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<IContact[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      return setSearchResults([])
    }
    const results = contactsList.filter(contact =>
      contact.name.includes(searchTerm)
    );
    setSearchResults(results)
  }, [searchTerm]);

  const handleSeacrhChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const dispatch = useAppDispatch()


  return (
    <div>
      <div className='searchResults'>
        <input
          type="text"
          placeholder="Поиск по имени"
          value={searchTerm}
          onChange={handleSeacrhChange}
        />

        {searchResults.length > 0
          ?
          <div >
            <h3>Результаты поиска</h3>
            <List
              items={searchResults}
              renderItem={(contact: IContact) =>
                <UserItem contact={contact} key={contact.id} isChangable={false}
                  removeContact={() => dispatch(removeContact(contact.id))} />} />
          </div>
          :
          <></>}
      </div>
    </div>
  )
};

export default Search