import React, { ChangeEvent, useEffect, useRef, useState} from 'react';

import logo from './logo.svg';
import './App.css';

import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.bundle.min.js';

import * as cornerstone from 'cornerstone-core/dist/cornerstone.js';

import CornerstoneViewport from 'react-cornerstone-viewport'
import initCornerstone from './appInit';
import axios from 'axios';
import { metaData } from '@cornerstonejs/core';

function App() {

  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [imageIds, setImageIds] = useState<string>();
  let element;
  useEffect(() => {
    initCornerstone();
    element = document.getElementById("dicomImage");
  }, [])




  let state = {
    tools: [
      // Mouse
      {
        name: 'Wwwc',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1 },
      },
      {
        name: 'Zoom',
        mode: 'active',
        modeOptions: { mouseButtonMask: 2 },
      },
      {
        name: 'Pan',
        mode: 'active',
        modeOptions: { mouseButtonMask: 4 },
      },
      // Scroll
      { name: 'StackScrollMouseWheel', mode: 'active' },
      // Touch
      { name: 'PanMultiTouch', mode: 'active' },
      { name: 'ZoomTouchPinch', mode: 'active' },
      { name: 'StackScrollMultiTouch', mode: 'active' },
    ],
    imageIds: [
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
    ],
    // imageIds: [
    //   `${cornerstoneWADOImageLoader.wadouri.fileManager.add(file)}`
    // ],
  };

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };

  let id;
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log(e);
    
    if (!e.target.files) {
      return;
    }


    setFile(e.target.files[0]);
    console.log(file);

    // id =cornerstoneWADOImageLoader.wadouri.fileManager.add(file)
    // console.log(cornerstoneWADOImageLoader.wadouri.loadImage());
    
    
    const formData = new FormData();
    formData.append('dicom', e.target.files[0]);


    axios.post('http://localhost:5000/upload_file', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })


//     const file = e.target.files ? e.target.files[0] : null;
//     setUploadedFiles(file);
//     const imageIds = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
// console.log(imageIds);

//     setImageIds(imageIds);
//     cornerstone.loadImage(imageIds).then((image) => {
//       cornerstone.displayImage(element, image);
//       console.log("haha");
      
//     }).catch(err => {
//       console.log(err);
      
//     })

  };

  // useEffect( () => {

  //   async function prefetchMetadataInformation(imageIdsToPrefetch) {
  //     for (let i = 0; i < imageIdsToPrefetch.length; i++) {
  //       await cornerstoneWADOImageLoader.wadouri.loadImage(imageIdsToPrefetch[i])
  //         .promise;
  //     }
  //   }


  //   console.log(prefetchMetadataInformation(id));
    


  // }, [handleFileChange])

  // function convertMultiframeImageIds(imageIds) {
  //   const newImageIds:Array<any> = [];
  //   imageIds.forEach((imageId) => {
  //     const { imageIdFrameless } = getFrameInformation(imageId);
  //     const instanceMetaData = metaData.get('multiframeModule', imageId);
  //     if (
  //       instanceMetaData &&
  //       instanceMetaData.NumberOfFrames &&
  //       instanceMetaData.NumberOfFrames > 1
  //     ) {
  //       const NumberOfFrames = instanceMetaData.NumberOfFrames;
  //       for (let i = 0; i < NumberOfFrames; i++) {
  //         const newImageId = imageIdFrameless + (i + 1);
  //         newImageIds.push(newImageId);
  //       }
  //     } else newImageIds.push(imageId);
  //   });
  //   return newImageIds;
  // }

  function getFrameInformation(imageId) {
    if (imageId.includes('wadors:')) {
      const frameIndex = imageId.indexOf('/frames/');
      const imageIdFrameless =
        frameIndex > 0 ? imageId.slice(0, frameIndex + 8) : imageId;
      return {
        frameIndex,
        imageIdFrameless,
      };
    } else {
      const frameIndex = imageId.indexOf('&frame=');
      let imageIdFrameless =
        frameIndex > 0 ? imageId.slice(0, frameIndex + 7) : imageId;
      if (!imageIdFrameless.includes('&frame=')) {
        imageIdFrameless = imageIdFrameless + '&frame=';
      }
      return {
        frameIndex,
        imageIdFrameless,
      };
    }
  }

  return (
    <div>
      <div>
        <h3>Upload area</h3>
        {/* <button onClick={handleUploadClick}>
          {file ? `${file.name}` : 'Click to select'}
        </button> */}
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>

      <CornerstoneViewport
        tools={state.tools}
        imageIds={state.imageIds}
        // imageIds={cornerstoneWADOImageLoader.wadouri.fileManager.add(file)}
        style={{ minWidth: '100%', height: '512px', flex: '1' }}
      />

      <div id='dicomImage'></div>

    </div>
  );
}

export default App;


// import React, { useEffect, useState } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneMath from "cornerstone-math";
// import cornerstoneTools from "cornerstone-tools";
// import Hammer from "hammerjs";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";
// import "./App.css";

// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;
// cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// const DicomViewer = () => {
//   const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);
//   const [imageIds, setImageIds] = useState<Array<String>>([]);
//   let element;
//   useEffect(() => {
//     element = document.getElementById("dicomImage");
//     cornerstone.enable(element);
//   });

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files) as Array<File>;
//     setUploadedFiles(files);
//     const imageIds = files.map((file) => {
//       return cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
//     });
//     setImageIds(imageIds);
//     cornerstone.loadImage(imageIds[0]).then((image) => {
//       cornerstone.displayImage(element, image);
//     });
//   };

//   return (
//     <div>
//       <h2>try uploading DICOM img</h2>
//       <input type="file" onChange={handleFileChange} multiple />
//       <div
//         id="dicomImage"
//         style={{ backgroundColor: "blue", height: "200px" }}
//       />
//       <h1> Can we do the same dicom img viewer using Threejs ? </h1>
//     </div>
//   );
// };

// export default DicomViewer;
