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
        if (!meshRef.current) return

        // Macao coordinates mapped to sphere texture
        const macaoLon = (113.55 / 360) * Math.PI * 2
        const macaoLat = (22.2 / 360) * Math.PI * 2

        // Target rotation to center Macao (with slight offsets for framing)
        const targetRotY = -macaoLon + Math.PI - 0.2
        const targetRotX = macaoLat - 0.15

        // Initial rotation for the Hero section (spin it 1.5 times away)
        meshRef.current.rotation.y = targetRotY - Math.PI * 1.5
        meshRef.current.rotation.x = -0.4

        const ctx = gsap.context(() => {
            // Cinematic zoom and spin into Macao
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#macao',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1.5,
                }
            })

            // Spin the earth to Macao's coordinates
            tl.to(meshRef.current.rotation, {
                y: targetRotY,
                x: targetRotX,
                ease: 'power2.inOut',
            }, 0)

            // Zoom the camera in close
            tl.to(camera.position, {
                z: 2.0, // zoom in significantly
                y: 0.1, // slight tilt
                x: 0.4, // shift slightly right
                ease: 'power2.inOut',
            }, 0)

            // Fade globe out after macao section
            gsap.to('.globe-canvas-container', {
                scrollTrigger: {
                    trigger: '#hobbies',
                    start: 'top bottom',
                    end: 'top center',
                    scrub: 1,
                },
                opacity: 0,
                ease: 'none'
            })
        })

        return () => ctx.revert()
    }, [camera])

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
