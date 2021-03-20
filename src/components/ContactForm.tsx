import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TContactsUpdaterFn } from '../context/ContactsContext';

interface IContactForm {
  setContacts: TContactsUpdaterFn;
  onsubmitCallback: () => void;
}

const ContactForm = ({
  setContacts,
  onsubmitCallback = () => {},
}: IContactForm) => {
  const [contact, setContact] = useState({});

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // @TODO - Add Validation
    setContacts((prevState) =>
      prevState ? [...prevState, contact] : [contact]
    );
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
          />
        </label>
      </div>

      <div className="text-end">
        <button type="submit" value="Submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
