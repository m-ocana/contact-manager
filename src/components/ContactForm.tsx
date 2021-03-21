import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TContact, TContactsUpdaterFn } from '../context/ContactsContext';
import FormTextField from './FormTextField';

type TContactFormProps = {
  editIndex: number;
  formState: TContact;
  setContacts: TContactsUpdaterFn;
  onsubmitCallback: () => void;
};

const ContactForm = ({
  editIndex = -1,
  formState = {},
  setContacts,
  onsubmitCallback = () => {},
}: TContactFormProps) => {
  const [contact, setContact] = useState(formState);

  const isEditMode = editIndex >= 0;

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // @TODO - Add Validation
    if (isEditMode) {
      setContacts((prevState) =>
        Object.assign([], prevState, { [editIndex]: contact })
      );
    } else {
      setContacts((prevState) =>
        prevState ? [...prevState, contact] : [contact]
      );
    }
    onsubmitCallback();
  };

  const onFieldChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormTextField
        name="name"
        type="text"
        onChange={onFieldChange}
        value={contact.name}
      />
      <FormTextField
        name="phone"
        type="tel"
        onChange={onFieldChange}
        value={contact.phone}
      />
      <FormTextField
        name="email"
        type="email"
        onChange={onFieldChange}
        value={contact.email}
      />
      <FormTextField
        name="address"
        textarea
        onChange={onFieldChange}
        value={contact.address}
      />

      <div className="text-end">
        <button
          type="submit"
          value="Submit"
          className="btn btn-primary"
          disabled={!contact.name}
        >
          {isEditMode ? 'Edit' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
