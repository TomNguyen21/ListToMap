
import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import FileDrop from '../../components/fileDrop/FileDrop';
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
      console.log({ files });
    }, [files]);


    // Image to text stuff
    const filterForAddress = (address) => {
      const newAddress = address.toLowerCase();

      if (newAddress.indexOf(' st') !== -1 || newAddress.indexOf(' ave') !== -1) {
        return true;
      }
      return false;
    }

    function parseAddresses(text) {
      // Regular expression pattern for matching street addresses
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
      files.forEach(previewImg)
    }

    const handleFileDrop = (droppedFiles) => {
      for (let droppedFile of droppedFiles) {
          dispatch(addFiles(droppedFile))
      }
      files.forEach(previewImg)
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
            console.log(text)
            console.log(matches)
            // const newText = text.split('\n')
            // const newList = [];
            // newText.forEach( (address) => {
            //   if (address.length > 1 && filterForAddress(address)) {
            //     console.log(address)
            //     address = address.split(', ');
            //     let galleryName = address.shift();
            //     // WIP - Doesnt work with every image if not formated correctly - Due to line breaks,names of instituitions, punctuation
            //     // look into https://medium.com/@geoapify/5-methods-for-parsing-street-and-postal-addresses-c4d95ae518ef
            //     let index = 0;
            //     if (address[0].indexOf('St') !== -1) {
            //       index = address[0].indexOf('St') + 2;
            //     } else if (address[0].indexOf('Ave') !== -1) {
            //       index = address[0].indexOf('Ave') + 3
            //     } else {
            //       index = address[0].length;
            //     }
            //     let newAddress = address[0].slice(0, index);
            //     newList.push([newAddress, galleryName]);
            //   }
            //   return null;
            // })
            // let uniqueAddress = Array.from(new Set([...newList.map(JSON.stringify), ...addresses.map(JSON.stringify)]), JSON.parse)
            // console.log(uniqueAddress)
            // dispatch(addAddress([...uniqueAddress]))
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
      { files ? (
        <div className="App">
          <div className="Uploader">
            <FileDrop onFileDrop={handleFileDrop}/>
            <span>Upload an image and we'll plot the addresses on a map!</span>
            <div className="fileChooser">
              <input type="file" onChange={onFileChange} multiple/>
            </div>
            <div className="fileSubmit">
              <input type="button" value="Upload" onClick={processImage} />
            </div>
            <span>or drag and drop a file here.</span>
            {/* DEMO IMAGES HERE PROBABLY */}
            {files.length < 1 ? (
              <div className='demoGallery'>
                  <div><img className='demoImg' src={Demo1} alt='Demo' /> </div>
                  <div><img className='demoImg' src={Demo2} alt='Demo' /> </div>
              </div>
            ) :
            <div id="gallery" /> }
          <div>
            <progress value={progress} max={1} />
          </div>
          </div>
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