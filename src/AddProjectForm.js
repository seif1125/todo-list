import React,{useState,useContext} from 'react';
import { ProjectContext } from './App';
const AddProjectForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
   const {handleAddProject} = useContext(ProjectContext);


  
    const addProject = (e) => {
      e.preventDefault();
      if (title.trim()) {
        const newProject= { id: Date.now(), name: title ,description:description,tasks:[]};
        handleAddProject(newProject);
        setTitle('');
        setDescription('');
      }
    };
  
    return (
      <form className="add-project-form" onSubmit={addProject}>
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