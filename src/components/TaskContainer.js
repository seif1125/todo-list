import React from "react";
import AddTask from "./AddTask";
import TasksList from "./TasksList";

const TasksContainer = ({ selectedProject }) => {
  return (
    <div className="tasks-container">
      <h2 className="project-title">
        {selectedProject?.name || "Untitled Project"}
      </h2>
      <TasksList tasks={selectedProject?.tasks} />
      <AddTask selectedProject={selectedProject} />
    </div>
  );
};

export default TasksContainer;
