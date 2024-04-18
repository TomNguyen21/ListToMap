
import React, { useState, useEffect } from 'react';
import './ImageReader.css';
import Tesseract from 'tesseract.js';
import FileDrop from '../../components/fileDrop/FileDrop';
import { useDispatch } from 'react-redux';
import { addToList } from './imageReaderSlice';

const ImageReader = () => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState([]);

    const dispatch = useDispatch();
    
    
    // Image to text stuff
    const filterForAddress = (address) => {
      const newAddress = address.toLowerCase();
    
      if (newAddress.indexOf(' st') !== -1 || newAddress.indexOf(' ave') !== -1) {
        return true;
      }
      return false;
    }
    
    const onFileChange = (e) => {
      setFiles([...files, e.target.files[0]])
    }
    
    const processImage = () => {
      files.map( file => {
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
                // Should i change 'result' from an array into a Set? That way i dont need to worry about there being multiple objects?
                // by changing to Set it would reduce chances for duplicates and then reduce the API call usage
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
            console.log(result, 'RESULT', newList, 'NEW LIST')
            let uniqueAddress = Array.from(new Set([...newList.map(JSON.stringify), ...result.map(JSON.stringify)]), JSON.parse)
            console.log(uniqueAddress, result)
    
            setResult([...uniqueAddress]);
            return;
          })
          return null;
      })
    }
    useEffect(() => {
      dispatch(addToList(result))
    }, [result])
    // dispatch(addToList(result))

    const handleFileDrop = (droppedFiles) => {
      setFiles([...files, droppedFiles]);
      console.log(files)
    }

    return (
      <>
      { files ? ( 
        <div className="App">
          <div className="Uploader">
            <FileDrop onFileDrop={handleFileDrop} onChange={onFileChange}/>
            {/* <div className="fileChooser">
              <input type="file" onChange={onFileChange}/>
            </div> */}
            <span>Upload an image and we'll plot the addresses on a map!</span>
            <div className="fileSubmit">
              <input type="button" value="Submit" onClick={processImage} />
            </div>
            <span>or drag and drop a file here.</span>
          <div>
            <progress value={progress} max={1} />
          </div>
          </div>
          <div style={{ margin: 20, fontSize: 18, fontWeight: 'bolder' }} >
            Result:
          </div>
          <>
          { result.length > 0 && result.map( (resultLine) => (
            <>
              <div>
                {resultLine[1]}, {resultLine[0]}
              </div>
              <br />
            </>
            ))
          }
          </>
        </div>
      ) : (
        <div> asdf</div>
      )}
      </>
    )
}


export default ImageReader;