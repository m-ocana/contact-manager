import React from 'react';
import ReactDom from 'react-dom';

interface IModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  open,
  onClose,
  children,
}: IModalProps): React.ReactPortal | null => {
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
    document.getElementById('portal') as Element
  );
};

export default Modal;
