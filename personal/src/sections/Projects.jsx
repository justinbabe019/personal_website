import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
    {
        title: 'Project One',
        desc: 'A placeholder for one of your awesome projects. Replace this with a real project description, links, and details.',
        tags: ['React', 'Three.js', 'GSAP'],
    },
    {
        title: 'Project Two',
        desc: 'Another placeholder project. Describe what you built, what tech you used, and what you learned.',
        tags: ['Python', 'Machine Learning'],
    },
    {
        title: 'Project Three',
        desc: 'Yet another project placeholder. Add your own projects, descriptions, and tech stacks here!',
        tags: ['C++', 'Game Dev', 'OpenGL'],
    },
    {
        title: 'Project Four',
        desc: 'One more placeholder. Feel free to add as many project cards as you need.',
        tags: ['Verilog', 'FPGA', 'Hardware'],
    },
]

export default function Projects() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.projects-title-anim', {
                scrollTrigger: {
                    trigger: '#projects',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.project-card', {
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="projects" className="section projects-section" ref={sectionRef}>
            <h2 className="section-title projects-title-anim">Projects 🚀</h2>
            <p className="section-subtitle projects-title-anim">
                Things I've built & contributed to
            </p>

            <div className="projects-grid">
                {projects.map((project, i) => (
                    <div className="project-card" key={i}>
                        <h3 className="project-card-title">{project.title}</h3>
                        <p className="project-card-desc">{project.desc}</p>
                        <div className="project-tags">
                            {project.tags.map((tag, j) => (
                                <span className="project-tag" key={j}>{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
