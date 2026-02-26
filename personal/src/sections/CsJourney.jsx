import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const timeline = [
    {
        year: 'Early Days',
        title: 'Game Development',
        desc: 'It all started with wanting to make my own games. I taught myself programming through game dev — building small projects, experimenting with game engines, and learning how code could bring ideas to life.',
    },
    {
        year: 'High School',
        title: 'Competitive Programming',
        desc: 'Game dev sparked a deeper passion for algorithms and problem-solving. I dove into competitive programming, spending hours solving algorithmic challenges and competing in contests. It sharpened my logical thinking like nothing else.',
    },
    {
        year: 'The Decision',
        title: 'Computer Science Major',
        desc: 'By this point, the choice was clear. Between VEX Robotics, game dev, and competitive programming, I knew CS was my path. I committed to pursuing Computer Science at the University of Michigan.',
    },
    {
        year: 'Now',
        title: 'Software Engineering',
        desc: 'Today, I\'m studying CS and Electrical Engineering at UMich, building real-world software, and continuing to grow as an engineer. Every hobby and experience led me here — and the journey is just beginning.',
    },
]

// Code rain characters
const codeChars = '01{}()[];=><+-*/&|!?:@#$%^~'

function CodeRain() {
    const columns = useMemo(() => {
        const cols = []
        for (let i = 0; i < 30; i++) {
            const chars = Array.from({ length: 15 }, () =>
                codeChars[Math.floor(Math.random() * codeChars.length)]
            ).join('\n')
            cols.push({
                chars,
                left: `${(i / 30) * 100}%`,
                duration: 8 + Math.random() * 12,
                delay: Math.random() * 10,
                fontSize: 10 + Math.random() * 6,
            })
        }
        return cols
    }, [])

    return (
        <div className="code-rain">
            {columns.map((col, i) => (
                <span
                    key={i}
                    style={{
                        left: col.left,
                        fontSize: `${col.fontSize}px`,
                        animationDuration: `${col.duration}s`,
                        animationDelay: `${col.delay}s`,
                    }}
                >
                    {col.chars}
                </span>
            ))}
        </div>
    )
}

export default function CsJourney() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cs-title-anim', {
                scrollTrigger: {
                    trigger: '#cs-journey',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.timeline-item', {
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                x: -50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power2.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="cs-journey" className="section cs-section" ref={sectionRef}>
            <CodeRain />

            <h2 className="section-title cs-title-anim" style={{ position: 'relative', zIndex: 1 }}>
                The Path to CS 💻
            </h2>
            <p
                className="section-subtitle cs-title-anim"
                style={{ position: 'relative', zIndex: 1 }}
            >
                How hobbies became a career
            </p>

            <div className="timeline" style={{ position: 'relative', zIndex: 1 }}>
                {timeline.map((item, i) => (
                    <div className="timeline-item" key={i}>
                        <div className="timeline-year">{item.year}</div>
                        <h3 className="timeline-title">{item.title}</h3>
                        <p className="timeline-desc">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
