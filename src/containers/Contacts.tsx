import React from 'react';
import { useContacts } from '../context/ContactsContext';

const Contacts = () => {
  const [contacts, setContacts] = useContacts();

  return (
    <div className="d-flex min-vw-100">
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="list-group list-group-flush">
          {contacts &&
            contacts.map(({ name }) => {
              return (
                <button
                  type="button"
                  className="list-group-item list-group-item-action bg-light"
                  key={name}
                >
                  {name}
                </button>
              );
            })}
        </div>
      </div>

      <div className="container-fluid">
        <div className="d-flex justify-content-between mt-4">
          <h1>Contact</h1>
          <div className="d-md-flex">
            <button type="button" className="btn btn-light btn-block">
              Edit
            </button>
          </div>
        </div>
        <p>Manu</p>
        <p>
          &quote;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.&quote;
        </p>
        <div className="position-absolute bottom-0 end-0 floating-button">
          <button
            type="button"
            className="btn btn-lg btn-primary rounded-circle"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
