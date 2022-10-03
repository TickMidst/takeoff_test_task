import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IContact } from '../types/types';

type ContactsState = {
    contactsList: IContact[]
}

const initialState: ContactsState = {
    contactsList: []
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts(state, action: PayloadAction<IContact[]>) {
            state.contactsList = action.payload
        },

        removeContact(state, action: PayloadAction<number>) {
            state.contactsList = state.contactsList.filter(contact => contact.id !== action.payload)
        },

        changeContact(state, {payload}: PayloadAction<{
            contact: IContact,
            newData: string,
            typeOfNewData: string
        }>) {
            const index = state.contactsList.findIndex(item => item.id == payload.contact.id)
                switch(payload.typeOfNewData) {
                    case 'name':
                        state.contactsList[index].name = payload.newData
                        break
                    case 'email':
                        state.contactsList[index].email = payload.newData
                        break
                    case 'phone':
                        state.contactsList[index].phone = payload.newData
                        break
                    case 'website':
                        state.contactsList[index].website = payload.newData
                        break
                }
        },

        createContact(state, action: PayloadAction<IContact>) {
            const newContact: IContact = {
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone,
                website: action.payload.website,
                id: state.contactsList.length + 1,
            }
            state.contactsList.push(newContact)
        },
    }
})

export const {setContacts, removeContact, changeContact, createContact} = contactsSlice.actions;
export default contactsSlice.reducer;