import React, { useState } from 'react';

const ProjectItem = ({ project, isSelected, onSelect, onEdit, onDelete }) => {
  // State for toggling description visibility
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(project.id);
    setIsExpanded((prev) => !prev);
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
           
            <span className={`arrow-icon ${isExpanded ? 'open' : ''}`}>
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Conditionally show the description */}
      {isExpanded && (
        <div className="project-description">
          <p>{project.description || 'No description available'}</p>
        </div>
      )}
    </li>
  );
};

export default ProjectItem;