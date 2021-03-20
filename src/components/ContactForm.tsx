import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TContact, TContactsUpdaterFn } from '../context/ContactsContext';

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
      <div className="mb-3">
        <label htmlFor="name" className="form-label w-100">
          Name:
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            aria-describedby="name"
            onChange={onFieldChange}
            value={contact.name}
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label w-100">
          Phone:
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-control"
            aria-describedby="phone"
            onChange={onFieldChange}
            value={contact.phone}
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label w-100">
          Email:
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            aria-describedby="email"
            onChange={onFieldChange}
            value={contact.email}
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label w-100">
          Address:
          <textarea
            id="address"
            name="address"
            className="form-control"
            onChange={onFieldChange}
            value={contact.address}
          />
        </label>
      </div>

      <div className="text-end">
        <button type="submit" value="Submit" className="btn btn-primary">
          {isEditMode ? 'Edit' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
