import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import reactLogo from './assets/react.svg'
import tailwindLogo from './assets/tailwindLogo.svg.png'
import viteLogo from '/vite.svg'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import './App.css'

function App() {
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
    spotLight.position.set(0, 0, 20);
    spotLight.shadow.mapSize.width = 1024; // Increase shadow resolution
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 0.5; // Adjust shadow camera near/far planes
    spotLight.shadow.camera.far = 50;
    scene.add(spotLight)

    const lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);
    // lights end

    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    const earthTexture = new THREE.TextureLoader().load('/src/assets/earth_daymap.jpg');
    const earthNormalTexture = new THREE.TextureLoader().load('/src/assets/earth_normal_map.tif');
    const sphereGeometry = new THREE.SphereGeometry( 32, 64, 32); 
    const sphereMaterial = new THREE.MeshStandardMaterial( { map: earthTexture, normalMap: earthNormalTexture} ); 
    const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial ); 
    scene.add(sphereMesh);

    const controls = new OrbitControls(camera, renderer.domElement);

    function addStar(){
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({color: 0xffffff});
      const star = new THREE.Mesh(geometry, material);
      const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
      star.position.set(x,y,z);
      scene.add(star);
    };
    Array(200).fill().forEach(addStar);
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

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const animate = () => {
      stats.update();
      controls.update();
      // animation start
      sphereMesh.rotation.x += 0.01;
      sphereMesh.rotation.y += 0.01;
      // animation end
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
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
