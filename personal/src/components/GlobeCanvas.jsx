import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Earth globe using a procedural shader */
function Globe() {
    const meshRef = useRef()
    const { camera } = useThree()

    // Load a high-res photorealistic earth texture map
    const textureLoader = new THREE.TextureLoader()
    const earthTexture = useMemo(() => textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'), [])

    // Atmosphere glow
    const atmosphereMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.42, 0.39, 1.0, 1.0) * intensity;
        }
      `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
        })
    }, [])

    // Scroll-driven camera animation
    useEffect(() => {
        const cameraPos = { x: 0, y: 0, z: 4.5 }
        const targetRotation = { y: 0 }

        // Initial position — globe shows Macao region
        // Macao: ~22.2°N, 113.55°E → rotate globe so that part faces camera
        const macaoLon = (113.55 / 360) * Math.PI * 2
        if (meshRef.current) {
            meshRef.current.rotation.y = -macaoLon + Math.PI
        }

        ScrollTrigger.create({
            trigger: '#macao',
            start: 'top bottom',
            end: 'top top',
            scrub: 1.5,
            onUpdate: (self) => {
                const progress = self.progress
                if (meshRef.current) {
                    // Zoom in
                    camera.position.z = 4.5 - progress * 2.5
                    // Slight tilt as we zoom
                    camera.position.y = progress * 0.3
                }
            }
        })

        // Fade globe out after macao section
        ScrollTrigger.create({
            trigger: '#hobbies',
            start: 'top bottom',
            end: 'top center',
            scrub: 1,
            onUpdate: (self) => {
                const container = document.querySelector('.globe-canvas-container')
                if (container) {
                    container.style.opacity = 1 - self.progress
                }
            }
        })
    }, [camera])

    // Auto rotation
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.08
        }
    })

    return (
        <group>
            {/* Earth */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshStandardMaterial
                    map={earthTexture}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>
            {/* Atmosphere */}
            <mesh scale={[1.15, 1.15, 1.15]} material={atmosphereMaterial}>
                <sphereGeometry args={[1.5, 64, 64]} />
            </mesh>
        </group>
    )
}

export default function GlobeCanvas() {
    return (
        <div className="globe-canvas-container">
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 3, 5]} intensity={1.2} />
                <pointLight position={[-5, -3, -5]} intensity={0.3} color="#6c63ff" />
                <Globe />
            </Canvas>
        </div>
    )
}
