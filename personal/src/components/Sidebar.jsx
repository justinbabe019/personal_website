import React, { useState, useEffect } from 'react'

export default function Sidebar({ sections }) {
    const [active, setActive] = useState('hero')

    useEffect(() => {
        // Use a single observer with a rootMargin that acts as a "trigger line"
        // roughly 30% from the top of the screen. This fixes the bug where
        // extremely tall sections (like Hobbies) would never reach a 35% threshold.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-30% 0px -65% 0px'
            }
        )

        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [sections])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className="sidebar-nav" aria-label="Page sections">
            {sections.map(({ id, label }) => (
                <div
                    key={id}
                    className={`sidebar-item ${active === id ? 'active' : ''}`}
                    onClick={() => scrollTo(id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Navigate to ${label}`}
                    onKeyDown={(e) => e.key === 'Enter' && scrollTo(id)}
                >
                    <span className="sidebar-label">{label}</span>
                    <span className="sidebar-dot" />
                </div>
            ))}
        </nav>
    )
}
