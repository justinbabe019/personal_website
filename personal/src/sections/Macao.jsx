import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const photos = [
    { src: 'https://picsum.photos/seed/macao1/600/450', caption: 'Growing up in Macao' },
    { src: 'https://picsum.photos/seed/macao2/600/450', caption: 'School memories' },
    { src: 'https://picsum.photos/seed/macao3/600/450', caption: 'Macao skyline' },
    { src: 'https://picsum.photos/seed/macao4/600/450', caption: 'Adventures in Macao' },
    { src: 'https://picsum.photos/seed/macao5/600/450', caption: 'With friends' },
    { src: 'https://picsum.photos/seed/macao6/600/450', caption: 'Hometown vibes' },
]

export default function Macao() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.macao-title-anim', {
                scrollTrigger: {
                    trigger: '#macao',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                x: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.macao-text', {
                scrollTrigger: {
                    trigger: '.macao-text',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
            })

            gsap.from('.photo-card', {
                scrollTrigger: {
                    trigger: '.photo-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: 'power2.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="macao" className="section macao-section" ref={sectionRef}>
            {/* Decorative lantern glows */}
            <div className="lantern-glow" style={{ top: '10%', right: '15%' }} />
            <div className="lantern-glow" style={{ bottom: '20%', left: '5%' }} />

            <h2 className="section-title macao-title-anim">Born in Macao 🏮</h2>
            <p className="section-subtitle macao-title-anim">Where my story begins</p>

            <p className="macao-text">
                I grew up in <span className="highlight">Macao</span>, a vibrant city
                where East meets West. Known for its Portuguese architecture, incredible
                food, and rich culture, Macao shaped who I am today. From <span className="highlight">Pui Ching
                    Middle School</span> to eventually making my way to the <span className="highlight">University of Michigan</span>,
                every step started here in this tiny but extraordinary place.
            </p>

            <div className="photo-grid">
                {photos.map((photo, i) => (
                    <div className="photo-card" key={i}>
                        <img
                            src={photo.src}
                            alt={photo.caption}
                            loading="lazy"
                        />
                        <div className="photo-caption">{photo.caption}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}
