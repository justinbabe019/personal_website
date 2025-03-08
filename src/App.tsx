// File name: App.tsx

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import LoadingScreen from './LoadingScreen.tsx';
import reactLogo from './assets/react.svg'
import tailwindLogo from './assets/tailwindLogo.svg.png'
import viteLogo from '/vite.svg'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import './App.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(()=>{
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, 
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#threeCanvas'), 
      antialias:true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: for softer shadows
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // lights start
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    // spotLight.castShadow = true;
    spotLight.position.set(0, 0, 50);
    spotLight.shadow.mapSize.width = 1024; // Increase shadow resolution
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 0.5; // Adjust shadow camera near/far planes
    spotLight.shadow.camera.far = 50;
    scene.add(spotLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(0, 0, 50)
    scene.add(dirLight);

    const lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);
    // lights end
    
    // objects start
    const earthTexture = new THREE.TextureLoader().load('/src/assets/earth_daymap.jpg');
    const earthNormalTexture = new THREE.TextureLoader().load('/src/assets/earth_normal_map.tif');
    const sphereGeometry = new THREE.SphereGeometry( 32, 64, 32); 
    const sphereMaterial = new THREE.MeshStandardMaterial( { map: earthTexture, normalMap: earthNormalTexture} ); 
    const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial ); 
    scene.add(sphereMesh);
    // objects end

    // helpers start
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    
    // Disable OrbitControls zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Add this line
    controls.enablePan = false; // Optional: disable panning

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    function addStar(){
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({color: 0xffffff});
      const star = new THREE.Mesh(geometry, material);
      const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
      star.position.set(x,y,z);
      scene.add(star);
    };
    Array(200).fill().forEach(addStar);
    // helpers end

    const spaceTexture = new THREE.TextureLoader().load(
      '/src/assets/space.jpeg',
      (texture) => {
        console.log('Texture loaded successfully:', texture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
    scene.background = spaceTexture;


    function moveCamera() {
      const scrollY = document.scrollingElement.scrollTop;
      const scrollHeight = document.scrollingElement.scrollHeight - window.innerHeight;
    
      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(scrollY / scrollHeight, 1);
    
      // Camera movement parameters
      const maxCameraZ = 96;      // Starting position
      const minCameraZ = 30;      // Closest zoom
      const cameraZ = maxCameraZ - (scrollProgress * (maxCameraZ - minCameraZ));
    
      // Sphere rotation parameters
      const rotationSpeed = 0.002;
    
      // Update camera position
      camera.position.z = cameraZ;
      camera.position.x = scrollProgress * -40;  // Horizontal movement
      camera.position.y = scrollProgress * -20;  // Vertical movement
    
      // Update sphere rotation
      sphereMesh.rotation.x += rotationSpeed;
      sphereMesh.rotation.y += rotationSpeed;
      sphereMesh.rotation.z += rotationSpeed * 0.5;
    }
    window.addEventListener('scroll', moveCamera);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener('scroll', moveCamera);
    };
  }, []);

  return (
    <>

      {/*
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      >
      */}

      <Navbar /> {/* Navbar is part of the global layout */}

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

        <a href="https://www.calligraphr.com/en/" target="_blank">
          <img src={reactLogo} className="logo" alt = "calligraphr"></img>
        </a>
        <a href="https://tailwindcss.com/" target="_blank">
          <img src={tailwindLogo} className="logo" alt="tailwind css logo"></img>
        </a>
      </div>

      <div>
        <canvas id="threeCanvas"></canvas>
      </div>

    </>
  )


}

export default App
