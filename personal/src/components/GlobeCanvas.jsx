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

    // Create a procedural earth-like texture
    const earthTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 1024
        canvas.height = 512
        const ctx = canvas.getContext('2d')

        // Ocean base
        const gradient = ctx.createLinearGradient(0, 0, 0, 512)
        gradient.addColorStop(0, '#0c2d48')
        gradient.addColorStop(0.3, '#145374')
        gradient.addColorStop(0.7, '#145374')
        gradient.addColorStop(1, '#0c2d48')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 1024, 512)

        // Simplified continent shapes
        ctx.fillStyle = '#2d6a4f'
        // Eurasia
        ctx.beginPath()
        ctx.ellipse(550, 170, 180, 60, 0.1, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(680, 200, 80, 50, 0.3, 0, Math.PI * 2)
        ctx.fill()
        // Africa  
        ctx.beginPath()
        ctx.ellipse(520, 280, 50, 70, 0.1, 0, Math.PI * 2)
        ctx.fill()
        // Americas
        ctx.beginPath()
        ctx.ellipse(250, 180, 40, 70, 0.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(270, 300, 35, 60, -0.2, 0, Math.PI * 2)
        ctx.fill()
        // Australia
        ctx.beginPath()
        ctx.ellipse(780, 320, 35, 25, 0.3, 0, Math.PI * 2)
        ctx.fill()
        // Southeast Asia / China region (near Macao)
        ctx.fillStyle = '#3a7d5c'
        ctx.beginPath()
        ctx.ellipse(710, 210, 50, 40, 0.2, 0, Math.PI * 2)
        ctx.fill()

        // Macao marker - small golden dot
        ctx.fillStyle = '#f0a830'
        ctx.beginPath()
        ctx.arc(700, 220, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(240, 168, 48, 0.3)'
        ctx.beginPath()
        ctx.arc(700, 220, 10, 0, Math.PI * 2)
        ctx.fill()

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
    }, [])

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
                    roughness={0.8}
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
