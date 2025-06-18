import React from "react";
import '../styles/Modal.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null; // don't render if modal is closed

  return (
    <div className="ModalBackdrop" onClick={onClose}>
      <div className="ModalContent" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
