import { useContext, useState } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

export default function AddTask({ selectedProject }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { addTask, addDraft } = useContext(ProjectContext);

  const handleTaskSubmission = (e, isDraft = false) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const taskData = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      ...(isDraft && {
        projectId: selectedProject.id,
        projectName: selectedProject.name,
      }),
    };

    isDraft ? addDraft(taskData) : addTask(taskData);
    resetForm();
  };

  const resetForm = () => {
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <form className="add-task-form" onSubmit={(e) => handleTaskSubmission(e)}>
      <h3>Add New Task</h3>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task Title"
        maxLength={25}
        required
      />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description"
        rows="4"
      />
      <div className="button-group">
        <button type="submit">Add Task</button>
        <button type="button" onClick={(e) => handleTaskSubmission(e, true)}>
          Save to Draft
        </button>
      </div>
    </form>
  );
}
