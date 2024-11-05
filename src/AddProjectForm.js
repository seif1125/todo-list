import React,{useState} from 'react';
const AddProjectForm = ({ onAddProject }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  
    const handleAddProject = (e) => {
      e.preventDefault();
      if (title.trim()) {
        onAddProject({ title, description });
        setTitle('');
        setDescription('');
      }
    };
  
    return (
      <form className="add-project-form" onSubmit={handleAddProject}>
        <h3>Add New Project</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          rows="3"
        />
        <button type="submit">Add Project</button>
      </form>
    );
  };
  
  export default AddProjectForm;