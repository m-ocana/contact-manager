import React from 'react';
import ReactDom from 'react-dom';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="modal" tabIndex={-1} style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <button
            type="button"
            className="btn-close modal-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          />
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
