import React from "react";

interface ModalProps {
  open: boolean;          // required to control visibility
  onClose: () => void;    // required for closing
  children: React.ReactNode; // children inside modal
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null; // hide if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        {children}
        <button onClick={onClose} className="mt-4 btn-hero">Close</button>
      </div>
    </div>
  );
};

export default Modal;
