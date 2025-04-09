// Projects.tsx
import React from 'react';
import './index.css'; // Ensure you import the CSS for styling

// Define the type for a single project
interface Project {
  id: string;
  name: string;
  description: string;
  imgs: string[];
  link: string;
}

// Define the props for the Projects component
interface ProjectsProps {
  projects: Project[]; // projects is an array of Project objects
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <>
      <div className="projects-container">
        {projects.map((project) => (
          <section id={project.id} className="project-card">
            {project.imgs.map((img)=>(
              <img src={img} alt={project.name} />
            ))}
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <a href={project.link}>Learn More</a>
          </section>
        ))}
      </div>
    </>
  );
};

export default Projects;