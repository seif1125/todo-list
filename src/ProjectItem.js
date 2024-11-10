import React, { useState } from 'react';

const ProjectItem = ({ project, isSelected, onSelect, onEdit, onDelete }) => {


  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(project.id);
   
  };

  return (
    <li className={`project-item ${isSelected ? 'selected' : ''}`}>
      <div className="project-header" onClick={handleClick}>
        <span>{project.name}</span>
        
        <div className="project-actions">
          {/* Edit and delete icons */}
          <span className="edit-button" onClick={(e) => { e.stopPropagation(); onEdit(project.id); }}>
            edit
          </span>
          <span className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}>
           delete
          </span>
           <span className='tasks-count'>{project?.tasks?.length ?? '--'} task(s)</span>
          <div>
           
            <span className={`arrow-icon ${isSelected? 'opened-project' : ''}`}>
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Conditionally show the description */}
      {isSelected && (
        <div className="project-description">
          <p>{project.description || 'No description available'}</p>
        </div>
      )}
    </li>
  );
};

export default ProjectItem;