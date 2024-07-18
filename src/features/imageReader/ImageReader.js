
import React, { useState, useEffect } from 'react';
import './ImageReader.css';
import Tesseract from 'tesseract.js';
import FileDrop from '../../components/fileDrop/FileDrop';
import { useSelector, useDispatch } from 'react-redux';
import { addToList, addFiles } from './imageReaderSlice';

const ImageReader = () => {
    // const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState([]);

    const dispatch = useDispatch();
    const addresses = useSelector( (state) => state.files.addresses)
    const files = useSelector( (state) => state.files.files)
    
    
    // Image to text stuff
    const filterForAddress = (address) => {
      const newAddress = address.toLowerCase();
    
      if (newAddress.indexOf(' st') !== -1 || newAddress.indexOf(' ave') !== -1) {
        return true;
      }
      return false;
    }
    
    const onFileChange = (e) => {
      // setFiles([...files, ...e.target.files])
      console.log(e.target.files)
      
      dispatch(addFiles(e.target.files))
      // for (const [key, value] of Object.entries(e.target.files)) {
      //   console.log(key, value)
      //   dispatch(addFiles(value))
      // }
      // dispatch(addFiles(...Object.entries(e.target.files)))
      // files.forEach(previewImg)
    }

    const handleFileDrop = (droppedFiles) => {
      // setFiles([...files, ...droppedFiles]);
      console.log(droppedFiles)
      dispatch(addFiles(droppedFiles))
      console.log(files)
      files.forEach(previewImg)
    }
    
    const processImage = () => {
      files.map( file => {
        console.log(file)
        Tesseract.recognize(
          file,
          "eng",
          { logger: m => {
            if(m.status === 'recognizing text') {
              setProgress(m.progress)
            }
          }})
          .then(({ data: { text } }) => {
            const newText = text.split('\n')
            const newList = [];
            newText.forEach( (address) => {
              if (address.length > 1 && filterForAddress(address)) {
                address = address.split(', ');
                let galleryName = address.shift();
                // WIP
                let index = 0;
                if (address[0].indexOf('St') !== -1) {
                  index = address[0].indexOf('St') + 2;
                } else if (address[0].indexOf('Ave') !== -1) {
                  index = address[0].indexOf('Ave') + 3
                } else {
                  index = address[0].length;
                }
                let newAddress = address[0].slice(0, index);
                newList.push([newAddress, galleryName]);
              }
              return null;
            })
            let uniqueAddress = Array.from(new Set([...newList.map(JSON.stringify), ...addresses.addresses.map(JSON.stringify)]), JSON.parse)
            console.log(uniqueAddress)
            // setResult([...uniqueAddress]);
            dispatch(addToList([...uniqueAddress]))
            
            console.log(addresses.addresses)
            return;
          })
          return null;
      })
    }


    const previewImg = (file) => {
      let reader = new FileReader()
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        let img = document.createElement('img');
        img.src = reader.result
        img.className = 'previewImg'
        document.getElementById('gallery').appendChild(img);
      }
    }

    return (
      <>
      { files ? ( 
        <div className="App">
          <div className="Uploader">
            <FileDrop onFileDrop={handleFileDrop}/>
            <span>Upload an image and we'll plot the addresses on a map!</span>
            <div className="fileChooser">
              <input type="file" onChange={onFileChange} multiple/>
            </div>
            <div className="fileSubmit">
              <input type="button" value="Submit" onClick={processImage} />
            </div>
            <span>or drag and drop a file here.</span>
          <div>
            <progress value={progress} max={1} />
          </div>
          </div>
          <div id="gallery" />
        </div>
      ) : (
        <>
          <div id="gallery" />
          <div style={{ margin: 20, fontSize: 18, fontWeight: 'bolder' }} >
            Result:
          </div>
          <>
          {console.log(result)}
          { result.length > 0 && result.map( (resultLine, index) => (
            <>
              <div key={index}>
                {resultLine[1]}, {resultLine[0]}
              </div>
              <br />
            </>
            ))
          }
          </>
          <this.Map />
        </>
      )}
      </>
    )
}


export default ImageReader;