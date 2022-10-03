import { FC, useState } from 'react'
import { IContact } from '../types/types'
import './UserItem.css'
import { changeContact } from '../store/contactSlice';
import { useAppDispatch } from '../hook';
import deleteIcon from './../assets/icons/delete.png'
import editIcon from './../assets/icons/edit.png'
import acceptChangesIcon from './../assets/icons/acceptChanges.png'

interface UserItemProps {
    contact: IContact,
    isChangable: boolean,
    removeContact: (contact: IContact) => void
}

const UserItem: FC<UserItemProps> = ({ contact, isChangable, removeContact }) => {
    const dispatch = useAppDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = e.target.value
        const typeOfNewData = e.target.id
        dispatch(changeContact({ contact, newData, typeOfNewData }))
    }

    return (
        <div style={{ padding: 15, border: '1px solid gray' }}>


{contact.id}
            <input type='text' value={contact.name}
                id='name'
                disabled={editMode ? false : true}
                className={editMode ? 'editMode' : 'input'}
                onChange={handleChange} />

            Email: <input type='text' value={contact.email}
                id='email'
                disabled={editMode ? false : true}
                className={editMode ? 'editMode' : 'input'}
                onChange={handleChange} />

            Телефон:  <input type='text' value={contact.phone}
                id='phone'
                disabled={editMode ? false : true}
                className={editMode ? 'editMode' : 'input'}
                onChange={handleChange} />

            Website:  <input
                type='text'
                id='website'
                value={contact.website}
                disabled={editMode ? false : true}
                className={editMode ? 'editMode' : 'input'}
                onChange={handleChange}
            />

            {isChangable 
            ? <div>
                <img src={deleteIcon} 
                    onClick={() => removeContact(contact)} />

                <img src={editMode ? acceptChangesIcon : editIcon} 
                    onClick={() => setEditMode(!editMode)} />
            </div> 
            : <></>
            }
        </div>
    )
}

export default UserItem