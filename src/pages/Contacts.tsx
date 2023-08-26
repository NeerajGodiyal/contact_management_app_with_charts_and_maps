import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";
import { removeContact } from "../Redux/action";
import { Contact } from "../Redux/reducer";

const Contacts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [singleContact, setSingleContact] = useState<Contact | {}>({});
  const AllContacts = useSelector((store: any) => store.contacts);
  const dispatch = useDispatch();

  const togglePopup = (contact: Contact) => {
    setSingleContact(contact);
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Contacts List
      </h1>
      <div className="flex justify-center mb-4">
        <button className="py-2 px-6 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          <Link to="/contact_form">Create Contact</Link>
        </button>
      </div>
      {Array.isArray(AllContacts) && AllContacts.length === 0 && (
        <div className="flex items-center justify-center h-64 text-gray-600">
          <svg
            className="w-16 h-16 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 21v-2m0 0V7.75A2.75 2.75 0 019.75 5h4.5A2.75 2.75 0 0117 7.75V19M7 21a2 2 0 002 2h6a2 2 0 002-2M7 21V7h10v14"
            ></path>
          </svg>
          <p className="text-lg">
            No Contact Found. Please add a contact using the Create Contact
            button.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.isArray(AllContacts) &&
          AllContacts.map((el: Contact) => (
            <div
              key={el.id}
              className="bg-white rounded-lg shadow-md p-6 text-gray-800 hover:shadow-lg"
              
              style={{
                border: "2px solid transparent",
                backgroundClip: "padding-box",
                borderColor: "#4299E1", 
              }}
            >
              <div
                onClick={() => togglePopup(el)}
                className="cursor-pointer"
              >
                {/* Add hover effect to the image */}
                <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full transform hover:scale-110 transition duration-300 ease-in-out">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transform hover:rotate-6"
                    src="https://img.freepik.com/free-vector/illustration-businesswoman_53876-5857.jpg?w=826&t=st=1693007917~exp=1693008517~hmac=d38278613744b334b3de0c8e76ef9efb69911c1a0aaccc8b1ab28994840c6158"
                    alt=""
                  />
                </div>
                {("id" in singleContact) && (
                  <Popup
                    close={() => togglePopup(singleContact)}
                    el={singleContact as Contact}
                    isOpen={isOpen}
                  />
                )}
                <div className="text-left">
                  <p className="text-lg font-semibold mb-1">
                    {el.first_name} {el.last_name}
                  </p>
                  <p className="text-sm mb-2">
                    Status:{" "}
                    {el.status === "active" ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <Link to={`edit/${el.id}`}>
                  <button className="py-1 px-4 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => dispatch(removeContact(el.id))}
                  className="py-1 px-4 rounded bg-red-600 text-white hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contacts;
