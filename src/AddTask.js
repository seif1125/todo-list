import { useContext, useState } from "react";
import { ProjectContext } from './App';

export default function AddTask({selectedProject}) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const {handleAddTask,handleAddDraft} =useContext(ProjectContext)

  const addTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      handleAddTask({ id:Date.now(),title: taskTitle, description: taskDescription });
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const addDraft = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      handleAddDraft({id:Date.now(), title: taskTitle, description: taskDescription,projectId:selectedProject.id,projectName:selectedProject.name });
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  return (
    <form className="add-task-form" onSubmit={addTask}>
      <input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add new task"
        type="text"
        maxLength={25}
      />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Add task description"
        rows="4"
      ></textarea>
      <div className="button-group">
        <button type="submit">Add Task</button>
        <button type="button" onClick={addDraft}>Save to Draft</button>
      </div>
    </form>
  );
}

