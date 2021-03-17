import React, { useState, FormEvent, ChangeEvent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import * as io from './utils/io';

const Hello = () => {
  const [contacts, setContacts] = useState(null);
  const [, setPassword] = useState('');

  function onSubmitHandler(e: FormEvent): void {
    e.preventDefault();

    if (!io.fileExists()) {
      io.createFile();
    }
    const rawData = io.readFile();
    const parsedJson = JSON.parse(rawData);
    setContacts(parsedJson);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  if (contacts) {
    return (
      <div className="d-flex min-vw-100">
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

        <div className="container-fluid">
          <h1 className="mt-4">Contact</h1>
          <p>Manu</p>
          <p>
            &quote;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.&quote;
          </p>
        </div>
      </div>
    );
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

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
