import React, { useState } from 'react';


const TaskItem = ({ task, onComplete, onDelete,onEdit }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription((prevShow) => !prevShow);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      
      
      <div className='task-bar' >
        <span>{task.title}</span>
        <div className="task-actions">
          <button className='task-item-toggle-description' onClick={toggleDescription}>
          {showDescription ? 'Hide Details' : 'Show Details'}
        </button>
        <div>
            <span>Is Complete?</span>
            <input type='checkbox'  onChange={onComplete} checked={task.completed } />
          </div>

          <button onClick={onEdit} className="edit-button" aria-label="Edit Task">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M12.146 3.854a.5.5 0 0 1 0 .707L5.707 11H4v-1.707l6.439-6.439a.5.5 0 0 1 .707 0zM11.5 2a1.5 1.5 0 0 1 1.061.439l1 1a1.5 1.5 0 0 1 0 2.122l-.646.646-3.5-3.5.646-.646A1.5 1.5 0 0 1 11.5 2z" />
            <path fillRule="evenodd" d="M1 13.5V16h2.5L14 5.5l-2.5-2.5L1 13.5zM0 13a1 1 0 0 1 1-1h3v3H1a1 1 0 0 1-1-1z" />
          </svg>
        </button>
          
         <button onClick={onDelete} className="delete-button" aria-label="Delete Task">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#000000"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 1 1 0v6a.5.5 0 0 1-1 0v-6zM7 4.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.5h3a.5.5 0 0 1 0 1h-1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9H2a.5.5 0 0 1 0-1h3zM4.118 5 4 5.059V14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V5.059L11.882 5H4.118zM5 4.5v-.5h6V4.5H5z" />
          </svg>
        </button>
      
        </div>
      </div>

      {/* Description section, shown conditionally */}
      {showDescription && (
        <div className="task-description">
          <p>{task.description || 'No description available'}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
