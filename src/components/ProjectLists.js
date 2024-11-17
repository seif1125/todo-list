import React from "react";
import ProjectItem from "./ProjectItem";
import AddProjectForm from "./AddProjectForm";

export default function ProjectsLists({ 
  projects, 
  onProjectSelect, 
  selectedProject, 
 
}) {
  return (
    <div className="projects-sidebar">
      <div className="projects-header">
        <h2>Projects</h2>
      </div>

      <ul className="project-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              isSelected={selectedProject?.id === project.id}
              onSelect={onProjectSelect}
            />
          ))
        ) : (
          <p>No projects available. Add a new project to get started!</p>
        )}
      </ul>

      <div className="add-project-form">
        <AddProjectForm />
      </div>
    </div>
  );
}
