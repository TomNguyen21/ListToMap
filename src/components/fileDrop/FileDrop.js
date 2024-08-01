// FileDrop.js
import React from 'react';
import './FileDrop.css'

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
      className="fileDrop"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      alt="Preview Image"
    />
  );
};

export default FileDrop;