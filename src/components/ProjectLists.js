import React ,{useState}from "react";
import ProjectItem from "./ProjectItem";
import AddProjectForm from "./AddProjectForm";

export default function ProjectsLists({ 
  projects, 
  onProjectSelect, 
  selectedProject, 
 
}) 

{
 
  const [editModeProjectId, setEditModeProjectId] = useState(null);


  const handleSelectProject = (projectId) => {
    onProjectSelect(projectId)
    setEditModeProjectId(null); // Exit edit mode when a new project is selected
  };

  const handleEditModeChange = (projectId, isEditMode) => {
    if (isEditMode) {
      setEditModeProjectId(projectId);
    } else {
      setEditModeProjectId(null); // Exit edit mode when it's saved or cancelled
    }
  };

  return (
    <div className="projects-sidebar">
      <div className="projects-header">
        <h2>Projects</h2>
      <ul className="project-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectItem
            key={project.id}
            project={project}
            isSelected={project.id === selectedProject?.id}
            editMode={project.id === editModeProjectId}
            onSelect={handleSelectProject}
            onEditModeChange={handleEditModeChange}
          />
          ))
        ) : (
          <p>No projects available. Add a new project to get started!</p>
        )}
      </ul></div>

      

      <div className="add-project-form">
        <AddProjectForm />
      </div>
    </div>
  );
}
