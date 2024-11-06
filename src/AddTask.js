import { useState } from "react";

export default function AddTask({ onAddTask, onSaveDraft }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask({ title: taskTitle, description: taskDescription });
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onSaveDraft({ title: taskTitle, description: taskDescription });
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleAddTask}>
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
        <button type="button" onClick={handleSaveDraft}>Save to Draft</button>
      </div>
    </form>
  );
}

