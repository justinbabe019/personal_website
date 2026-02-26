import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const hobbies = [
    {
        id: 'saxophone',
        theme: 'hobby-saxophone',
        label: '♪ Music',
        title: 'Saxophone',
        description:
            "Music has always been a huge part of my life. I started playing the saxophone and fell in love with the way it lets you express emotions through sound. From jazz to classical, playing sax taught me discipline, creativity, and the beauty of improvisation — skills that carry over into everything I do.",
        image: 'https://picsum.photos/seed/saxophone/800/800',
    },
    {
        id: 'fencing',
        theme: 'hobby-fencing',
        label: '⚔ Sport',
        title: 'Fencing',
        description:
            "Fencing is like chess at lightning speed — every bout is a battle of strategy and reflexes. I've trained in fencing and it's shaped my ability to think under pressure, anticipate moves, and commit to decisions in split seconds. En garde!",
        image: 'https://picsum.photos/seed/fencing/800/800',
    },
    {
        id: 'cats',
        theme: 'hobby-cats',
        label: '🐱 Companions',
        title: 'My Two Cats',
        description:
            "I'm a proud cat parent of two adorable furballs! They're the best stress relief after a long day of coding. Whether they're napping on my keyboard or chasing laser dots, they always bring joy (and a bit of chaos) to my life.",
        image: 'https://picsum.photos/seed/cats/800/800',
    },
    {
        id: 'robotics',
        theme: 'hobby-robotics',
        label: '🤖 Engineering',
        title: 'VEX Robotics',
        description:
            "VEX Robotics was my gateway into engineering. Building robots from scratch — designing, programming, and competing — gave me my first taste of what it means to create something that works in the real world. This was where my love for problem-solving truly began.",
        image: 'https://picsum.photos/seed/robotics/800/800',
    },
]

export default function Hobbies() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hobbies-title-anim', {
                scrollTrigger: {
                    trigger: '#hobbies',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            hobbies.forEach((hobby, i) => {
                const direction = i % 2 === 0 ? -1 : 1
                gsap.from(`.hobby-block-${hobby.id} .hobby-visual`, {
                    scrollTrigger: {
                        trigger: `.hobby-block-${hobby.id}`,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                    x: direction * 80,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                })

                gsap.from(`.hobby-block-${hobby.id} .hobby-content`, {
                    scrollTrigger: {
                        trigger: `.hobby-block-${hobby.id}`,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                    x: -direction * 80,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.15,
                    ease: 'power3.out',
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="hobbies" className="section hobbies-section" ref={sectionRef}>
            <h2 className="section-title hobbies-title-anim">Things I Love</h2>
            <p className="section-subtitle hobbies-title-anim" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
                Hobbies & passions that shaped me
            </p>

            {hobbies.map((hobby) => (
                <div
                    key={hobby.id}
                    className={`hobby-block hobby-block-${hobby.id} ${hobby.theme}`}
                >
                    <div className="hobby-visual">
                        <img src={hobby.image} alt={hobby.title} loading="lazy" />
                    </div>
                    <div className="hobby-content">
                        <div className="hobby-label">{hobby.label}</div>
                        <h3 className="hobby-title">{hobby.title}</h3>
                        <p className="hobby-description">{hobby.description}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}
