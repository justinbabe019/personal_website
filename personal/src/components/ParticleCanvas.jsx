import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Create a small circular sprite texture
function createCircleTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
}

function Particles() {
    const pointsRef = useRef()
    const count = 600

    const circleTexture = useMemo(() => createCircleTexture(), [])

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 8

            // Soft purple/blue/white mix
            const r = 0.5 + Math.random() * 0.3
            const g = 0.4 + Math.random() * 0.3
            const b = 0.8 + Math.random() * 0.2
            colors[i * 3] = r
            colors[i * 3 + 1] = g
            colors[i * 3 + 2] = b
        }

        return { positions, colors }
    }, [])

    useFrame((state) => {
        if (pointsRef.current) {
            const time = state.clock.elapsedTime
            pointsRef.current.rotation.y = time * 0.01
            pointsRef.current.rotation.x = Math.sin(time * 0.008) * 0.03

            const posArray = pointsRef.current.geometry.attributes.position.array
            for (let i = 0; i < count; i++) {
                const i3 = i * 3
                posArray[i3 + 1] += Math.sin(time * 0.2 + i * 0.05) * 0.001
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={count}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                map={circleTexture}
                alphaMap={circleTexture}
                alphaTest={0.01}
            />
        </points>
    )
}

export default function ParticleCanvas() {
    return (
        <div className="particle-canvas-container">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ antialias: false, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Particles />
            </Canvas>
        </div>
    )
}
