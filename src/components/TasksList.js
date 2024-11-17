import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="task-list-empty">No tasks available. Add a task to get started!</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
