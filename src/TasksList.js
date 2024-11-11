import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <div className="task-list">
      {tasks?.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={() => onComplete(task.id)}
            onDelete={() => onDelete(task.id)}
          />
        ))
      ) : (
        <p>No tasks available. Add a task to get started!</p>
      )}
    </div>
  );
};

export default TaskList;