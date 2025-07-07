import React from 'react';

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}