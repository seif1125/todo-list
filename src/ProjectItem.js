import React, { useState, useRef,useContext, useEffect } from 'react';
import { ProjectContext } from './App';
const ProjectItem = ({ project, isSelected,onSelect}) => {
  const [editMode, setEditMode] = useState(false);
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description);
  const inputRef = useRef(null);
  const {handleEditProject,handleDeleteProject} = useContext(ProjectContext);


  useEffect(()=>{
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  },[editMode])
  
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(project.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditMode(true);
    
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (projectName.trim() && (projectName !== project.name || projectDescription !== project.description)) {
      handleEditProject({
        ...project,
        name: projectName.trim(),
        description: projectDescription.trim(),
      });
    }
    setEditMode(false);
  };



  return (
    <li className={`project-item ${isSelected ? 'selected' : ''}`}>
      <div className="project-header" onClick={handleClick}>
        {editMode ? (
          <input
            type="text"
            value={projectName}
            ref={inputRef}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Edit project name"
            maxLength={50}
          />
        ) : (
          <span>{project.name}</span>
        )}

        <div className="project-actions">
          
          {isSelected && (!editMode) &&(
            <>
              
             
                <span className="edit-button" onClick={handleEdit}>
                  Edit
                </span>
              
              <span
                className="delete-button"
                onClick={
                 
                  ()=>{handleDeleteProject(project.id);}
                }
              >
                Delete
              </span>
            </>
          )}
        { !editMode&&<span className="tasks-count">{project?.tasks?.length ?? '--'} task(s)</span>}
            { editMode&&<span className="save-project-button" onClick={handleSave}>
                  Save
          </span>}
          <div>
            <span className={`arrow-icon ${isSelected ? 'opened-project' : ''}`}>▼</span>
          </div>
         
       
         
        </div>
      </div>

      {/* Conditionally show description */}
      {isSelected && (
        <div className="project-description">
          {editMode ? (
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Edit project description"
              rows="3"
            ></textarea>
          ) : (
            <p>{project.description || 'No description available'}</p>
          )}
        </div>
      )}
    </li>
  );
};

export default ProjectItem;
