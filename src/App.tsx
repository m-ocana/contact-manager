import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

import Welcome from './components/Welcome';
import Contacts from './components/Contacts';

import { ContactsProvider } from './context/ContactsContext';

export type TContact = {
  name: string;
};

export default function App() {
  return (
    <ContactsProvider>
      <Router>
        <Switch>
          <Route path="/contacts" component={Contacts} />
          <Route path="/" component={Welcome} />
        </Switch>
      </Router>
    </ContactsProvider>
  );
}
