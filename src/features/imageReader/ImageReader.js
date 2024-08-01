
import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import FileDrop from '../../components/fileDrop/FileDrop';
import icon from '../../assets/icons/UploadIcon.png';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, addFiles } from './imageReaderSlice';

import './ImageReader.css';
import Demo1 from '../../assets/data/Demo1.png'
import Demo2 from '../../assets/data/Demo2.png'

const ImageReader = () => {
    const [progress, setProgress] = useState(0);

    const dispatch = useDispatch();
    const addresses = useSelector( (state) => state.files.addresses)
    const files = useSelector( (state) => state.files.files)

    useEffect(() => {
      console.log(files);
      files.forEach(previewImg)
    }, [files]);


    // Image to text stuff

    function parseAddresses(text) {
      // Regular expression pattern for matching street addresses
      //TODO: Still need to refine this so it will get more of the addresses and the names of venues
      const addressPattern = /\b\d{1,5}\s\w+(?:\s\w+)?\s(?:N|S|E|W|NE|NW|SE|SW)?\s?(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir|Way|Terrace|Ter|Place|Pl)\b/gi;

      // Find all matches in the input text
      const matches = text.match(addressPattern);

      return matches || [];
  }

    const onFileChange = (e) => {
      let currFiles = e.target.files;
      for (let currFile of currFiles) {
        dispatch(addFiles(currFile))
      }
    }

    const handleFileDrop = (droppedFiles) => {
      for (let droppedFile of droppedFiles) {
          dispatch(addFiles(droppedFile))
      }
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
            let matches = parseAddresses(text);
            let uniqueAddress = Array.from(new Set([...matches.map(JSON.stringify), ...addresses.map(JSON.stringify)]), JSON.parse)
            console.log(uniqueAddress)
            dispatch(addAddress([...uniqueAddress]))
            return;
          })
          return null;
      })
    }


    const previewImg = (file) => {
      let reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let img = document.createElement('img');
        img.src = reader.result
        img.className = 'previewImg'
        document.getElementById('gallery').appendChild(img);
      }
    }

    return (
      <>
      { files.length ? (
        <div className="App">
          <FileDrop onFileDrop={handleFileDrop} onFileChange={onFileChange} processImage={processImage} progress={progress}/>
          {/* <div className="Uploader">
            <FileDrop onFileDrop={handleFileDrop}/>
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
          </div> */}
          {/* </div>DEMO IMAGES HERE PROBABLY */}
            {files.length <= 0 ? (
              <div className='demoGallery'>
                <span className='uploadMsg' >No image? Try one of these:</span>
                <div style={{display: 'flex', margin: 36}}>
                  <div><img className='demoImg' src={Demo1} alt='Demo' /> </div>
                  <div><img className='demoImg' src={Demo2} alt='Demo' /> </div>
                </div>
              </div>
            ) :
            <div className="App">

              <div id="gallery" /> 
            </div>
            }
        </div>
      ) : (
        //TODO: Create new compnent/feature to render the results and replace with React Component
        <>
          <div id="gallery" />
          <div style={{ margin: 20, fontSize: 18, fontWeight: 'bolder' }} >
            Result:
          </div>
          <>
          { addresses.length > 0 && addresses.map( (resultLine, index) => (
            <>
              <div key={index}>
                {resultLine[1]}, {resultLine[0]}
              </div>
              <br />
            </>
            ))
          }
          </>
        </>
      )}
      </>
    )
}


export default ImageReader;