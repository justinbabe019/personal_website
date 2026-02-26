import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const links = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/angie_leong.n.c/',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
        handle: '@angie_leong.n.c',
    },
    {
        label: 'Email',
        href: 'mailto:ncleong@umich.edu',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        handle: 'ncleong@umich.edu',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nga-chi-angie-leong-a37a0924a',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
        ),
        handle: 'Angie Leong',
    },
]

export default function Contact() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-title-anim', {
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.contact-link', {
                scrollTrigger: {
                    trigger: '.contact-links',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.12,
                ease: 'power2.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="contact" className="section contact-section" ref={sectionRef}>
            <h2 className="section-title contact-title-anim">Let's Connect ✨</h2>
            <p className="contact-message contact-title-anim">
                Whether you want to chat about code, music, cats, or anything in between
                — I'd love to hear from you!
            </p>

            <div className="contact-links">
                {links.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        className="contact-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.icon}
                        <span>{link.handle}</span>
                    </a>
                ))}
            </div>

            <p className="contact-footer">
                © {new Date().getFullYear()} Nga Chi (Angie) Leong · Built with React & Three.js
            </p>
        </section>
    )
}
