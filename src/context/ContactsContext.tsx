import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

type TContact = {
  name: string;
};
type TState = TContact[] | null;
type TUpdaterFn = Dispatch<SetStateAction<TState>>;
type TContactProviderProps = { children: ReactNode };

const ContactsContext = createContext<[TState, TUpdaterFn] | undefined>(
  undefined
);

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

export { ContactsProvider, useContacts };
