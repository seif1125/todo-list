import React, { useState, useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addProject } = useContext(ProjectContext);

  const handleAddProject = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newProject = {
      id: Date.now(),
      name: title.trim(),
      description: description.trim(),
      tasks: [],
    };

    addProject(newProject);

    // Reset form fields
    setTitle("");
    setDescription("");
  };

  return (
    <form className="add-project-form" onSubmit={handleAddProject}>
      <h3>Add New Project</h3>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          maxLength={50}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description (Optional)"
          rows="3"
        />
      </div>
      <button type="submit" className="add-project-button">
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;
