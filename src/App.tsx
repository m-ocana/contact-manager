import React, { useState, FormEvent, ChangeEvent, SyntheticEvent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import * as io from './utils/io';

interface WelcomeProps {
  onSubmitHandler: (e: SyntheticEvent) => void;
  setPassword: (s: string) => void;
}

const Welcome = ({ onSubmitHandler = () => {}, setPassword }: WelcomeProps) => {
  function onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  return (
    <div>
      <h1>Welcome to Secure Contact Manager</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label w-100">
            Please enter the password for your contact data file
            <input
              id="password"
              type="password"
              className="form-control"
              aria-describedby="password"
              onChange={onInputChange}
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

interface Contact {
  name: string;
}
interface ContactProps {
  contacts: Contact[] | null;
}

const Contacts = ({ contacts }: ContactProps) => {
  return (
    <div className="d-flex min-vw-100">
      {contacts && (
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            {contacts.map(({ name }) => {
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
      )}

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

const AppContainer = () => {
  const [contacts, setContacts] = useState(null);
  const [password, setPassword] = useState('');

  function onSubmitHandler(e: FormEvent): void {
    e.preventDefault();

    if (!io.fileExists()) {
      io.encrypt([], password);
    }
    const data = io.decrypt(password);
    setContacts(data);
  }

  return !contacts ? (
    <Welcome onSubmitHandler={onSubmitHandler} setPassword={setPassword} />
  ) : (
    <Contacts contacts={contacts} />
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={AppContainer} />
      </Switch>
    </Router>
  );
}
