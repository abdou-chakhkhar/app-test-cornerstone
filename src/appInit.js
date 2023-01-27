import dicomParser from 'dicom-parser';
// import cornerstone from 'cornerstone-core';
// import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
// import cornerstoneMath from 'cornerstone-math';
// import cornerstoneTools from 'cornerstone-tools';
// import Hammer from 'hammerjs';

import * as Hammer from 'hammerjs';
import * as cornerstone from 'cornerstone-core/dist/cornerstone.js';
import * as cornerstoneMath from 'cornerstone-math/dist/cornerstoneMath.js';
import * as cornerstoneTools from 'cornerstone-tools/dist/cornerstoneTools.js';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.bundle.min.js';


export default function initCornerstone() {

  // Cornerstone Tools
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.init();

  // Image Loader
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
        strict: false,
      },
    },
  });
}