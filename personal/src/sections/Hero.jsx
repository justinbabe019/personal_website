import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-name', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.3,
            })
            gsap.from('.hero-tagline', {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.6,
            })
            gsap.from('.hero-scroll-indicator', {
                opacity: 0,
                duration: 1,
                delay: 1.5,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="hero" className="section hero-section" ref={sectionRef}>
            <h1 className="hero-name">Angie Leong</h1>
            <p className="hero-tagline">
                Software Engineer<br />
                <span style={{ fontSize: '0.6em', opacity: 0.8 }}>From Macao to the World</span>
            </p>
            <div className="hero-scroll-indicator">
                <span>Scroll to explore</span>
                <div className="chevron" />
            </div>
        </section>
    )
}
