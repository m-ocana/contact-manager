import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactsContext';
import { useModalReducer, modalActions } from '../reducers/modalReducer';
import ContactSidebar from '../components/ContactSidebar';
import Contact from '../components/Contact';
import Modal from '../components/Modal';
import ContactForm from '../components/ContactForm';
import io from '../utils/io';

const EditContactButton = ({ onClickHandler = () => {} }) => (
  <div className="position-absolute top-0 end-0 m-4">
    <button
      type="button"
      className="btn btn-light btn-block"
      onClick={onClickHandler}
    >
      Edit
    </button>
  </div>
);

const AddContactButton = ({ onClickHandler = () => {} }) => (
  <div className="position-absolute bottom-0 end-0 m-4">
    <button
      type="button"
      className="btn btn-lg btn-primary rounded-circle"
      onClick={onClickHandler}
    >
      +
    </button>
  </div>
);

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
      {contacts && (
        <ContactSidebar
          activeContactState={[activeIdx, setActiveIdx]}
          contacts={contacts}
        />
      )}

      <div className="container-fluid">
        {activeContact && (
          <>
            <EditContactButton
              onClickHandler={() =>
                dispatch({ type: modalActions.EDIT_CONTACT })
              }
            />
            <Contact contact={activeContact} />
          </>
        )}
        <AddContactButton
          onClickHandler={() => dispatch({ type: modalActions.ADD_CONTACT })}
        />
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
