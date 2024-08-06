// FileDrop.js
import React from 'react';
import './FileDrop.css'
import icon from '../../assets/icons/UploadIcon.png';

const FileDrop = ({ onFileDrop, onFileChange, processImage, progress }) => {

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
      alt="DragAndDrop"
    >
      <div className="Uploader">
        <div className="innerUpload">
          <img className='uploadIcon' src={icon} alt='Upload' />
          <span className="uploadMsg">Upload an image and we'll plot the addresses on a map!</span>
          <div className="fileChooser">
            <input type="file" onChange={onFileChange} multiple hidden/>
          </div>
          <div className="fileSubmit">
            <input className='uploadButton' type="button" value="Upload image" onClick={processImage} />
          </div>
          <span>or drag and drop a file here.</span>
          <div>
            <progress value={progress} max={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDrop;