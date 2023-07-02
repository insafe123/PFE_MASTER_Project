// import React,{ useState, useRef, useEffect } from 'react';
// import '@kitware/vtk.js/Rendering/Profiles/Geometry';
// import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
// import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
// import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
// import vtkXMLPolyDataReader from '@kitware/vtk.js/IO/XML/XMLPolyDataReader';
// import axios from 'axios';
// import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
// import vtkLookupTable from '@kitware/vtk.js/Common/Core/LookupTable';
// import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
// function VTKViewer() {
//   const [file, setFile] = useState(null);
//   const vtkContainerRef = useRef(null);
//   const context = useRef(null);
//
//
//
//   const handleVisualize = async () => {
//     if (!file) {
//       console.error('No VTP file selected');
//       return;
//     }
//
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//
//       const baseUrl = 'http://localhost:8000';
//       const uploadResponse = await axios.post(`${baseUrl}/upload`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//
//       const vtpFileUrl = `${baseUrl}/vtp-file`;
//       visualizeVTPFile(vtpFileUrl);
//     } catch (error) {
//       console.error('Error visualizing VTP file:', error);
//     }
//   };
//
//
//   const visualizeVTPFile = (vtpFileUrl) => {
//     const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
//       rootContainer: vtkContainerRef.current,
//     });
//     const renderer = fullScreenRenderer.getRenderer();
//     const renderWindow = fullScreenRenderer.getRenderWindow();
//
//     const vtpReader = vtkXMLPolyDataReader.newInstance();
//     vtpReader.setUrl(vtpFileUrl).then(() => {
//       const polyData = vtpReader.getOutputData(0);
//
//       const mapper = vtkMapper.newInstance();
//       mapper.setInputData(polyData);
//
//       const actor = vtkActor.newInstance();
//       actor.setMapper(mapper);
//
//       renderer.addActor(actor);
//
//       renderer.resetCamera();
//       renderWindow.render();
//
//       context.current = {
//         fullScreenRenderer,
//         vtpReader,
//         polyData,
//         mapper,
//         actor,
//       };
//     });
//   };
//
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };
//
//   useEffect(() => {
//     return () => {
//       if (context.current) {
//         const { fullScreenRenderer, vtpReader, polyData, mapper, actor } = context.current;
//         if (vtpReader) vtpReader.delete();
//         if (polyData) polyData.delete();
//         if (mapper) mapper.delete();
//         if (actor) actor.delete();
//         if (fullScreenRenderer) fullScreenRenderer.delete();
//
//
//       }
//
//     };
//
//
//
//
//   }, []);
//
//   return (
//     <div>
//       <div ref={vtkContainerRef} />
//       <table
//         style={{
//           position: 'absolute',
//           top: '25px',
//           left: '25px',
//           background: 'white',
//           padding: '12px',
//         }}
//       >
//         <tbody>
//           <tr>
//             <td>
//               <input type="file" accept=".vtp" onChange={handleFileChange} />
//             </td>
//           </tr>
//
//
//
//
//           <tr>
//             <td>
//               <button type="button" onClick={handleVisualize}>
//                 Predict
//               </button>
//           </td>
//         </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
//
// export default VTKViewer;
//


//////////////////////////just visualization ////////////////////////////////
// import React, { useState, useRef, useEffect } from 'react';
// import '@kitware/vtk.js/Rendering/Profiles/Geometry';
// import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
// import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
// import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
// import vtkXMLPolyDataReader from '@kitware/vtk.js/IO/XML/XMLPolyDataReader';
//
// function VTKViewer() {
//   const [file, setFile] = useState(null);
//   const vtkContainerRef = useRef(null);
//   const context = useRef(null);
//
//   const handleVisualize = () => {
//     if (!file) {
//       console.error('No VTP file selected');
//       return;
//     }
//
//     const reader = new FileReader();
//     reader.onload = async () => {
//       const content = reader.result;
//       visualizeVTPFile(content);
//     };
//     reader.readAsText(file);
//   };
//
//   const visualizeVTPFile = (content) => {
//     const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
//       rootContainer: vtkContainerRef.current,
//     });
//     const renderer = fullScreenRenderer.getRenderer();
//     const renderWindow = fullScreenRenderer.getRenderWindow();
//
//     const vtpReader = vtkXMLPolyDataReader.newInstance();
//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     vtpReader.setUrl(url).then(() => {
//       const polyData = vtpReader.getOutputData();
//
//       const mapper = vtkMapper.newInstance();
//       mapper.setInputData(polyData);
//
//       const actor = vtkActor.newInstance();
//       actor.setMapper(mapper);
//
//       renderer.addActor(actor);
//
//       renderer.resetCamera();
//       renderWindow.render();
//
//       context.current = {
//         fullScreenRenderer,
//         vtpReader,
//         polyData,
//         mapper,
//         actor,
//       };
//     });
//   };
//
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };
//
//   useEffect(() => {
//     return () => {
//       if (context.current) {
//         const { fullScreenRenderer, vtpReader, polyData, mapper, actor } = context.current;
//         if (vtpReader) vtpReader.delete();
//         if (polyData) polyData.delete();
//         if (mapper) mapper.delete();
//         if (actor) actor.delete();
//         if (fullScreenRenderer) fullScreenRenderer.delete();
//       }
//     };
//   }, []);
//
//   return (
//     <div>
//       <div ref={vtkContainerRef} />
//       <table
//         style={{
//           position: 'absolute',
//           top: '25px',
//           left: '25px',
//           background: 'white',
//           padding: '12px',
//         }}
//       >
//         <tbody>
//           <tr>
//             <td>
//               <input type="file" accept=".vtp" onChange={handleFileChange} />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <button type="button" onClick={handleVisualize}>
//                 Visualize
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
//
// export default VTKViewer;


/////////////////black object returned////////////////////////
// import React, { useState, useRef, useEffect } from 'react';
// import '@kitware/vtk.js/Rendering/Profiles/Geometry';
// import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
// import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
// import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
// import vtkXMLPolyDataReader from '@kitware/vtk.js/IO/XML/XMLPolyDataReader';
// import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
// import vtkDataArray from "vtk.js/Sources/Common/Core/DataArray";
//
// function VTKViewer() {
//   const [file, setFile] = useState(null);
//   const vtkContainerRef = useRef(null);
//   const context = useRef(null);
//
//   const handleVisualize = () => {
//     if (!file) {
//       console.error('No VTP file selected');
//       return;
//     }
//
//     const reader = new FileReader();
//     reader.onload = async () => {
//       const content = reader.result;
//       visualizeVTPFile(content);
//     };
//     reader.readAsText(file);
//   };
//
//   const visualizeVTPFile = (content) => {
//     const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
//       rootContainer: vtkContainerRef.current,
//     });
//     const renderer = fullScreenRenderer.getRenderer();
//     const renderWindow = fullScreenRenderer.getRenderWindow();
//
//     const vtpReader = vtkXMLPolyDataReader.newInstance();
//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     vtpReader.setUrl(url).then(() => {
//       const polyData = vtpReader.getOutputData();
//
// const labelArray = polyData.getCellData().getArray('Label'); // Replace 'Label' with the actual name of the array in your VTP file
//
//   const colorArray = vtkDataArray.newInstance({
//     name: 'Colors',
//     numberOfComponents: 3, // RGB
//     values: new Uint8Array(labelArray.length * 3), // Allocate space for RGB values
//   });
//
//   const colorTransferFunction = vtkColorTransferFunction.newInstance();
//   const numClasses = 15;
//   const colorStep = 1.0 / (numClasses - 1);
//   for (let i = 0; i < numClasses; i++) {
//     const color = i * colorStep;
//     colorTransferFunction.addRGBPoint(i, color, color, color);
//   }
//
//   for (let i = 0; i < labelArray.length; i++) {
//     const label = labelArray.getValue(i);
//     const color = colorTransferFunction.getIndexedRGBColor(label);
//     colorArray.setData(3 * i, color);
//   }
//
//   polyData.getCellData().setScalars(colorArray);
//
//   // Create mapper and actor
//   const mapper = vtkMapper.newInstance();
//   mapper.setInputData(polyData);
//   mapper.setLookupTable(colorTransferFunction);
//
//   const actor = vtkActor.newInstance();
//   actor.setMapper(mapper);
//
//       // Apply colors based on the label array
//       mapper.setScalarModeToUseCellData();
//       mapper.setColorModeToMapScalars();
//       mapper.setScalarRange(labelArray.getRange());
//       mapper.setLookupTable(colorTransferFunction);
//  // Set scalar visibility for the mapper
//   mapper.setScalarVisibility(true);
//       renderer.addActor(actor);
//
//       renderer.resetCamera();
//       renderWindow.render();
//
//       context.current = {
//         fullScreenRenderer,
//         vtpReader,
//         polyData,
//         mapper,
//         actor,
//       };
//     });
//   };
//
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };
//
//   useEffect(() => {
//     return () => {
//       if (context.current) {
//         const { fullScreenRenderer, vtpReader, polyData, mapper, actor } = context.current;
//         if (vtpReader) vtpReader.delete();
//         if (polyData) polyData.delete();
//         if (mapper) mapper.delete();
//         if (actor) actor.delete();
//         if (fullScreenRenderer) fullScreenRenderer.delete();
//       }
//     };
//   }, []);
//
//   return (
//     <div>
//       <div ref={vtkContainerRef} />
//       <table
//         style={{
//           position: 'absolute',
//           top: '25px',
//           left: '25px',
//           background: 'white',
//           padding: '12px',
//         }}
//       >
//         <tbody>
//           <tr>
//             <td>
//               <input type="file" accept=".vtp" onChange={handleFileChange} />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <button type="button" onClick={handleVisualize}>
//                 Visualize
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
//
// export default VTKViewer;
//////////////paraview test///////////////////////////////////

