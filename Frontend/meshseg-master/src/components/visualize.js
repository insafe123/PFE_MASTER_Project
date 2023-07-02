import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function ThreeScene() {
  const [model, setModel] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState(null);
  const [vtpFileUrl, setVtpFileUrl] = useState('');
  const [labels, setLabels] = useState([]);
  const [numFaces, setNumFaces] = useState(0);
  const [numVertices, setNumVertices] = useState(0);
  const [numMeshes, setNumMeshes] = useState(0);

  const displayModel = useRef(false);


  const calculateModelInfo = (object) => {
  let totalFaces = 0;
  let totalVertices = 0;
  let totalMeshes = 0;

  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const geometry = child.geometry;
      console.log('Child Geometry:', geometry); // Log the child geometry object for inspection
      console.log(geometry.getAttribute('position').count);
      // Calculate model information here
      let numFaces = geometry.attributes.position.count / 3;
      let numVertices = geometry.attributes.position.count;
      totalFaces += numFaces;
      totalVertices += numVertices;
      totalMeshes++;

    }
  });

  setNumFaces(totalFaces);
  setNumVertices(totalVertices);
  setNumMeshes(totalMeshes);
};
  useEffect(() => {
    if (model && labels.length > 0) {

    }
  }, [model, labels]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setModel(null);
    displayModel.current = false;

    const newFormData = new FormData();
    newFormData.append('file', file);
    setFormData(newFormData);

    if (file.name.endsWith('.obj')) {
      const loader = new OBJLoader();
      loader.load(
        URL.createObjectURL(file),
        (obj) => {
          setModel(obj);
          obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const geometry = child.geometry;
          console.log('Child Geometry:', geometry); // Log the child geometry object for inspection
        }
      });
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
    } else if (file.name.endsWith('.stl')) {
      const loader = new STLLoader();
      loader.load(
        URL.createObjectURL(file),
        (geometry) => {
          const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
          const mesh = new THREE.Mesh(geometry, material);
          setModel(mesh);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
    } else if (file.name.endsWith('.gltf') || file.name.endsWith('.glb')) {
      const loader = new GLTFLoader();
      loader.load(
        URL.createObjectURL(file),
        (gltf) => {
          setModel(gltf.scene || gltf.scenes[0]);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Invalid file type');
    }
  };

  const handlePredictModel = async () => {
    setUploading(true);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const labels = response.data;
      setLabels(labels);
      setMessage('Model predicted successfully');
      renderModel('');
      console.log('Labels:', labels);
      calculateModelInfo(model)
    } catch (error) {
      console.error('Error predicting model:', error);
    }

    try {
      const response = await axios.get('http://localhost:8000/vtp-file', {
        responseType: 'blob',
      });
      const vtpFileBlob = new Blob([response.data]);
      const vtpFileUrl = URL.createObjectURL(vtpFileBlob);
      console.log('VTP file URL:', vtpFileUrl);
      setVtpFileUrl(vtpFileUrl);
    } catch (error) {
      console.error('Error fetching VTP file:', error);
    }

    setUploading(false);

  };

  const renderModel = (object) => {
    const canvas = document.getElementById('canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(1600,800);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    scene.add(light);
    scene.background = new THREE.Color(0xffffff);

    if (object) {
      scene.add(object);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  };


  const handleDisplayModel = () => {
    displayModel.current = true;
    renderModel(model);
  };



  const handleDownload = () => {
    if (vtpFileUrl) {
      const link = document.createElement('a');
      link.href = vtpFileUrl;
      link.download = 'output.vtp';
      link.click();
    }
  };

return (
    <div className='in'>
      <form >
        <input  className="hi" type="file" accept=".obj,.stl,.glb,.gltf" onChange={handleFileUpload} />
         <div className="space">
        </div>
        {!displayModel.current && (

          <button type="button" className="display-button" onClick={handleDisplayModel} disabled={!model}>
            Display Model
          </button>

        )}
        <div className="space">
        </div>
        <button type="button" className="display-button" onClick={handlePredictModel} disabled={!model || uploading}>
          {uploading ? 'Predicting...' : 'Predict'}
        </button>
        <div className="space">
        </div>
        <button type="button" className="display-button" onClick={handleDownload} disabled={!vtpFileUrl}>
          Download predicted file
        </button>
      </form>
      {message && <div>{message}</div>}
      <canvas  id="canvas" style={{ width: '1700px', height: '1500px' }}></canvas>
    </div>
  );
}

export default ThreeScene;