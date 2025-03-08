import React from 'react'
import './Project.css'

const projects = [
  {
    id: "towerDefence",
    name: 'Tower Defense Game',
    description: 'A 3D tower defense game with custom assets and mechanics.',
    img: 'https://via.placeholder.com/150',
    link: '#towerDefense',
  },
  {
    id: "adventureGame",
    name: 'Adventure Game',
    description: 'A collaborative adventure game with custom animations and mechanics.',
    img: 'https://via.placeholder.com/150',
    link: '#adventureGame',
  },
  {
    id: "mazeGame",
    name: 'Maze Game',
    description: 'A maze game with challenging puzzles and levels.',
    img: 'https://via.placeholder.com/150',
    link: '#mazeGame',
  },
  {
    id: "portfolio",
    name: 'This Portfolio',
    description: 'A personal portfolio website built with React and Three.js.',
    img: 'https://via.placeholder.com/150',
    link: '#portfolio',
  },
  {
    id: "ascendTech",
    name: 'Ascend Tech',
    description: 'A web application for managing tech projects and teams.',
    img: 'https://via.placeholder.com/150',
    link: '#ascendTech',
  },
  {
    id: "secureBlox",
    name: 'Secure Blox',
    description: 'A blockchain-based security application.',
    img: 'https://via.placeholder.com/150',
    link: '#secureBlox',
  },
];

function Project(){
   return (
      <>
      {projects.map((project) => (
         <section id={project.id} className="project-card">
           <img src={project.img} alt={project.name} />
           <h2>{project.name}</h2>
           <p>{project.description}</p>
           <a href={project.link}>Learn More</a>
         </section>
       ))}
       </>
    );
}
export default Project;