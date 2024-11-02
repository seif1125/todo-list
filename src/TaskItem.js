import React from 'react';

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span>{task.title}</span>
      <div className="task-actions">
        <button onClick={onComplete}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;