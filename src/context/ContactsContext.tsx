import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

type TContact = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
};
type TContactsState = TContact[] | null;
type TContactsUpdaterFn = Dispatch<SetStateAction<TContactsState>>;
type TContactProviderProps = { children: ReactNode };

const ContactsContext = createContext<
  [TContactsState, TContactsUpdaterFn] | undefined
>(undefined);

const ContactsProvider = ({ children }: TContactProviderProps) => {
  const contactState = useState<TContact[] | null>(null);

  return (
    <ContactsContext.Provider value={contactState}>
      {children}
    </ContactsContext.Provider>
  );
};

function useContacts() {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
}

export { ContactsProvider, useContacts, TContact, TContactsUpdaterFn };
