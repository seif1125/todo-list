import React from 'react';


export default function ProjectsSidebar  ({ projects, onProjectSelect, selectedProject })  {
  return (
    <div className="projects-sidebar">
      <h2>Projects</h2>
      
      <ul className="project-list">
        {projects.map((project) => (
          <li
            key={project.id}
            className={`project-item ${selectedProject.id === project.id ? 'selected' : ''}`}
            onClick={()=>onProjectSelect(project.id)}
          >
            {project.name}
          </li>
        ))}
      </ul>

    
    </div>
  );
};

