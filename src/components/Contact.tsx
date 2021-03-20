import React from 'react';

interface IContactProps {
  contact: { [key: string]: string };
}

const Contact = ({ contact }: IContactProps) => {
  return (
    <div className="container">
      <h1 className="my-4">{contact.name}</h1>
      <div className="contact-details">
        {Object.keys(contact)
          .filter((k) => k !== 'name')
          .map((key) => (
            <div className="row mb-2" key={`${key}-row`}>
              <div className="col-sm-3">
                <span className="capitalize">{key}:</span>
              </div>
              <div
                className={`col-sm-9${key === 'address' ? ' multi-line' : ''}`}
              >
                {contact[key]}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contact;
