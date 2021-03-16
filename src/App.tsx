import React, { useState, FormEvent, ChangeEvent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import * as io from './utils/io';

const Hello = () => {
  const [contacts, setContacts] = useState<string | undefined>(undefined);
  const [, setPassword] = useState('');

  function onSubmitHandler(e: FormEvent): void {
    e.preventDefault();

    if (!io.fileExists()) {
      io.createFile();
    }

    const data = io.readFile();
    setContacts(data);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  if (contacts) {
    return <div>{contacts}</div>;
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
