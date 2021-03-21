import React, { ChangeEventHandler } from 'react';

interface IFormTextField {
  name: string;
  type?: string;
  onChange:
    | ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | (() => void);
  value?: string;
  textarea?: boolean;
}

const FormTextField = ({
  name = '',
  type = '',
  onChange = () => {},
  value = '',
  textarea = false,
}: IFormTextField) => (
  <div className="mb-3">
    <label htmlFor="name" className="form-label w-100 capitalize">
      {`${name}:`}
      {textarea ? (
        <textarea
          id={name}
          name={name}
          className="form-control"
          rows={4}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className="form-control"
          onChange={onChange}
          value={value}
        />
      )}
    </label>
  </div>
);

export default FormTextField;
