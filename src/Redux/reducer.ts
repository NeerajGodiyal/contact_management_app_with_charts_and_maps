import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

// Define the Contact interface
export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  mob: string;
  status: string;
}

// Define the AppState interface
interface AppState {
  contacts: Contact[];
}

// Parse contacts from localStorage or return an empty array if null
const initialContacts: Contact[] = JSON.parse(localStorage.getItem("contacts") || "[]") as Contact[];

const initialState: AppState = {
  contacts: initialContacts,
};

const reducer = (state: AppState = initialState, action: any): AppState => {
  // Define action handlers as an object
  const actionHandlers: Record<string, () => AppState> = {
    [ADD_CONTACT]: () => {
      let flag = 0;
      if (action.payload.first_name === "" || action.payload.last_name === "" || action.payload.mob === "") {
        alert('Ohh, You Missed Required Input, Please fill');
        flag = 1;
      } else {
        state.contacts.forEach((el: Contact) => {
          if (el.first_name === action.payload.first_name && el.last_name === action.payload.last_name) {
            alert('Name Already Exists In Contacts');
            flag = 1;
          }
        });
      }

      if (!flag) {
        alert('Contact Saved Successfully!!!');
        let updatedContacts = JSON.parse(localStorage.getItem("contacts") || "[]") as Contact[];
        updatedContacts.push({ id: state.contacts.length + 1, ...action.payload });
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        return {
          ...state,
          contacts: [...updatedContacts],
        };
      }
      return state;
    },

    [REMOVE_CONTACT]: () => {
      let Contacts = JSON.parse(localStorage.getItem("contacts") || "[]") as Contact[];
      let updatedContacts = Contacts.filter((el: Contact) => el.id !== action.payload.id);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return {
        ...state,
        contacts: [...updatedContacts],
      };
    },

    [EDIT_CONTACT]: () => {
      if (action.payload.first_name === "" || action.payload.last_name === "" || action.payload.mob === "") {
        alert('Input Fields Cannot Be Left Empty');
        return state;
      } else {
        let flag = 0;
        let Contacts = JSON.parse(localStorage.getItem("contacts") || "[]") as Contact[];

        Contacts.forEach((el: Contact) => {
          if (el.id !== action.payload.id && el.first_name === action.payload.first_name && el.last_name === action.payload.last_name) {
            alert("Name Already Exists!!");
            flag = 1;
          }
        });

        if (flag) {
          return state;
        } else {
          let updatedContacts = Contacts.map((el: Contact) => {
            if (el.id === action.payload.id) {
              return { ...action.payload };
            } else {
              return el;
            }
          });
          localStorage.setItem("contacts", JSON.stringify(updatedContacts));
          alert('Contact has been Updated');
          return {
            ...state,
            contacts: state.contacts.map((el: Contact) => {
              if (el.id === action.payload.id) {
                return { ...action.payload };
              } else {
                return el;
              }
            }),
          };
        }
      }
    },
  };

  // Use the action type to call the appropriate action handler
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type]();
  }

  return state;
};

export default reducer;