import React, { useEffect, useState } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import "./App.css";

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const DicomViewer = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  let element;
  useEffect(() => {
    element = document.getElementById("dicomImage");
    cornerstone.enable(element);
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
    const imageIds = files.map((file) => {
      return cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    });
    setImageIds(imageIds);
    cornerstone.loadImage(imageIds[0]).then((image) => {
      cornerstone.displayImage(element, image);
    });
  };

  return (
    <div>
      <h2>try uploading DICOM img</h2>
      <input type="file" onChange={handleFileChange} multiple />
      <div
        id="dicomImage"
        style={{ backgroundColor: "blue", height: "200px" }}
      />
      <h1> Can we do the same dicom img viewer using Threejs ? </h1>
    </div>
  );
};

export default DicomViewer;
