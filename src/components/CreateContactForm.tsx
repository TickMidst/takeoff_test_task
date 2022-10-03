import React, {useState} from 'react'
import { useAppDispatch, useAppSelector} from '../hook';
import { createContact } from '../store/contactSlice';
import addUser from './../assets/icons/add-user.png'
import './CreateContactForm.css'

export const CreateContactForm: React.FC<{}> = () => {
    const dispatch = useAppDispatch()
    const contactsList = useAppSelector(state => state.contacts.contactsList)
  
    const [contactCreation, setContactCreation] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [website, setWebsite] = useState<string>('')

    const handleClick = () => {
      setContactCreation(!contactCreation)
    }

    const handleCreateContact = () => {
      setContactCreation(!contactCreation)
        dispatch(createContact({
            name: name,
            email: email,
            phone: phone,
            website: website,
            id: contactsList.length
        }))
    }

return (
  <div> {contactCreation 
  ? <div className='newContactAddingField'>
    <form onSubmit={handleCreateContact}> 
    <input id='name' type='text' placeholder='Введите имя' value={name} onChange={(e) => setName(e.target.value) } required  />
    <input id='email' type='text' placeholder='Введите email' value={email} onChange={(e) => setEmail(e.target.value) } required />
    <input id='phone' type='text' placeholder='Введите телефон' value={phone} onChange={(e) => setPhone(e.target.value) } required />
    <input id='website' type='text' placeholder='Введите адрес сайта' value={website} onChange={(e) => setWebsite(e.target.value) } required />

    <button type='submit'>Создать</button>
    <button onClick={() => setContactCreation(!contactCreation)} > Отмена </button>
    </form>
  </div>
  :  
      <img src={addUser} onClick={handleClick}/>
  }
  </div>
)
};

export default CreateContactForm