import React, { useState, useEffect } from 'react'

export default function Sidebar({ sections }) {
    const [active, setActive] = useState('hero')

    useEffect(() => {
        const observers = []

        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActive(id)
                    }
                },
                { threshold: 0.35 }
            )

            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach(o => o.disconnect())
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
