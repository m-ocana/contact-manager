import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactsContext';
import { useModalReducer, modalActions } from '../reducers/modalReducer';
import Modal from './Modal';
import ContactForm from './ContactForm';
import io from '../utils/io';

const Contacts = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [contacts, setContacts] = useContacts();
  const [modalState, dispatch] = useModalReducer();

  const activeContact =
    contacts && contacts.length ? contacts[activeIdx] : null;

  const isEditMode = modalState.mode === modalActions.EDIT_CONTACT;

  useEffect(() => {
    if (contacts) io.encrypt(contacts);
  }, [contacts]);

  return (
    <div className="d-flex min-vw-100">
      <div className="bg-light border-right min-vh-100">
        <div className="list-group list-group-flush">
          {contacts &&
            contacts.map(({ name }, i) => {
              return (
                <button
                  type="button"
                  className={`list-group-item list-group-item-action${
                    i === activeIdx ? ' active' : ''
                  }`}
                  key={name}
                  onClick={() => setActiveIdx(i)}
                >
                  {name}
                </button>
              );
            })}
        </div>
      </div>

      <div className="container-fluid">
        {activeContact && (
          <>
            <h1 className="mt-4">{activeContact.name}</h1>
            <p>Phone: {activeContact.name}</p>
            <p>Email: {activeContact.email}</p>
            <p>Address:</p>
            <p className="multi-line">{activeContact.address}</p>
          </>
        )}

        <div className="position-absolute top-0 end-0 m-4">
          <button
            type="button"
            className="btn btn-light btn-block"
            onClick={() => dispatch({ type: modalActions.EDIT_CONTACT })}
          >
            Edit
          </button>
        </div>
        <div className="position-absolute bottom-0 end-0 m-4">
          <button
            type="button"
            className="btn btn-lg btn-primary rounded-circle"
            onClick={() => dispatch({ type: modalActions.ADD_CONTACT })}
          >
            +
          </button>
        </div>
      </div>

      <Modal
        open={modalState.isOpen}
        onClose={() => dispatch({ type: modalActions.CLOSE_MODAL })}
      >
        <ContactForm
          formState={isEditMode && activeContact ? activeContact : {}}
          editIndex={isEditMode ? activeIdx : -1}
          setContacts={setContacts}
          onsubmitCallback={() => dispatch({ type: modalActions.CLOSE_MODAL })}
        />
      </Modal>
    </div>
  );
};

export default Contacts;
