
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageReader = () => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState([]);
    
    
    // Image to text stuff
    const filterForAddress = (address) => {
      // figure out how to manage the list into this array to find addresses
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
            const newList = newText.filter( (address) => {
              if (address.length > 1 && filterForAddress(address))
                return address;
            })
    
            setResult([...result, ...newList]);
            return;
          })
          return null;
      })
    }

    return (
        <div className="App">
          <input type="file" onChange={onFileChange}/>
          <div style={{marginTop: 25}}>
            <input type="button" value="Submit" onClick={processImage} />
          </div>
          <div>
            <progress value={progress} max={1} />
          </div>
          <div style={{ margin: 20, fontSize: 18, fontWeight: 'bolder' }} >
            Result:
          </div>
          <>
          { result.length > 0 && result.map( (resultLine, index) => (
            <>
              <div>
                {resultLine}
              </div>
              <br />
            </>
            ))
          }
          </>
        </div>
    )
}


export default ImageReader;