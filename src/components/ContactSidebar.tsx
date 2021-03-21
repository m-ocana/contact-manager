import React, { Dispatch, SetStateAction } from 'react';
import { TContact } from '../context/ContactsContext';

interface IContactSideBarProps {
  contacts: TContact[];
  activeContactState: [number, Dispatch<SetStateAction<number>>];
}

const ContactSidebar = ({
  contacts,
  activeContactState: [activeIdx, setActiveIdx],
}: IContactSideBarProps) => {
  if (contacts.length === 0) return null;
  return (
    <div className="bg-light border-right contact-sidebar">
      <div className="list-group list-group-flush">
        {contacts.map(({ name }, i) => {
          return (
            <button
              type="button"
              className={`list-group-item list-group-item-action${
                i === activeIdx ? ' active' : ''
              }`}
              key={name}
              onClick={() => setActiveIdx(i)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContactSidebar;
