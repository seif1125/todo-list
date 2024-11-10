import React from 'react';
import ProjectItem from './ProjectItem';
import AddProjectForm from './AddProjectForm';

export default function ProjectsSidebar  ({ projects, onProjectSelect, selectedProject })  {
  return (
    <div className="projects-sidebar">
      <div>
        <h2>Projects</h2>
        <ul className="project-list">
        {projects.map((project) => (
          <ProjectItem
          key={project.id}
          project={project}
          isSelected={selectedProject?.id === project.id}
          onSelect={onProjectSelect}
          onEdit={()=>{}} //handleEditProject}
          onDelete={()=>{}} //handleDeleteProject}
        />
        ))}
      </ul>
      </div>
      
      
      

     <AddProjectForm onAddProject={()=>{}} />   {/*onAddProject */}
    
    
    </div>
  );
};

