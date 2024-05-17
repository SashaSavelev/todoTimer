import React from 'react';

interface PopupProps {
  message: string;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-dark-grey text-white p-9 w-1/3 rounded-lg shadow-lg z-10 max-w-sm mx-auto">
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};
