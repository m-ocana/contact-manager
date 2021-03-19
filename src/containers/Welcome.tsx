import React, { useState, ChangeEvent, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';
import io from '../utils/io';

const Welcome = ({ history }: RouteComponentProps) => {
  const [password, setPassword] = useState('');
  const [, setContacts] = useContacts();

  const onSubmitHandler = (e: FormEvent): void => {
    e.preventDefault();
    try {
      if (!io.fileExists()) {
        io.encrypt([], password);
      }
      const data = io.decrypt(password);
      setContacts(data);
      history.push('/contacts');
    } catch (err) {
      setPassword('');
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1>Welcome to Secure Contact Manager</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label w-100">
            Please enter the password for your {!io.fileExists() && `new `}
            contact data file
            <input
              id="password"
              type="password"
              className="form-control"
              aria-describedby="password"
              onChange={onInputChange}
              value={password}
            />
          </label>
        </div>
        <div className="text-end">
          <button type="submit" value="Submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Welcome;
