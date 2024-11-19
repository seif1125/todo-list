import React from "react";
import AddTask from "./AddTask";
import TasksList from "./TasksList";

const TasksContainer = ({ selectedProject,projects }) => {
  return (
    <div className="tasks-container">
      <h2 className="project-title">
        {selectedProject?.name || ""}
      </h2>
      <TasksList tasks={selectedProject?.tasks} />
      {projects.length>0&&<AddTask selectedProject={selectedProject} />}
    </div>
  );
};

export default TasksContainer;
