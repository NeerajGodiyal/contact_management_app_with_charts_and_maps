import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  mob: string;
  status: string;
}

export const addContact = (payload: Contact) => {
  console.log(payload);
  return {
    type: ADD_CONTACT,
    payload,
  };
};

export const removeContact = (id: number) => {
  return {
    type: REMOVE_CONTACT,
    payload: {
      id,
    },
  };
};

export const editContact = (payload: Contact) => {
  console.log(payload);
  return {
    type: EDIT_CONTACT,
    payload,
  };
};
