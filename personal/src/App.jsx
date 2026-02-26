import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlobeCanvas from './components/GlobeCanvas'
import ParticleCanvas from './components/ParticleCanvas'
import Hero from './sections/Hero'
import Macao from './sections/Macao'
import Hobbies from './sections/Hobbies'
import CsJourney from './sections/CsJourney'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Sidebar from './components/Sidebar'
import './styles/sections.css'
import './styles/nav.css'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
    { id: 'hero', label: 'Home' },
    { id: 'macao', label: 'Macao' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'cs-journey', label: 'CS Journey' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
]

export default function App() {
    const containerRef = useRef(null)

    useEffect(() => {
        // Refresh ScrollTrigger after mount
        ScrollTrigger.refresh()
        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    return (
        <>
            {/* Three.js background canvases */}
            <GlobeCanvas />
            <ParticleCanvas />

            {/* Floating sidebar navigation */}
            <Sidebar sections={SECTIONS} />

            {/* Scrollable content overlay */}
            <div className="scroll-container" ref={containerRef}>
                <Hero />
                <Macao />
                <Hobbies />
                <CsJourney />
                <Projects />
                <Contact />
            </div>
        </>
    )
}
