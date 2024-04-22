// FileDrop.js
import React from 'react';

const FileDrop = ({ onFileDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFileDrop(files);
  };

  return (
    <div
      className="fileChooser"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ width: '300px', height: '300px', border: '2px dashed gray', textAlign: 'center' }}
    >
      Drop files here
    </div>
  );
};

export default FileDrop;