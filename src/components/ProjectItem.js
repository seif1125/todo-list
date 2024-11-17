import React, { useState, useRef, useContext, useEffect } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

const ProjectItem = ({ project, isSelected, onSelect }) => {
  const [editMode, setEditMode] = useState(false);
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description);
  const inputRef = useRef(null);
  const { editProject, deleteProject } = useContext(ProjectContext);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(project.id);
  };

  const enableEditMode = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  const saveChanges = (e) => {
    e.stopPropagation();
    if (
      projectName.trim() &&
      (projectName !== project.name || projectDescription !== project.description)
    ) {
      editProject({
        ...project,
        name: projectName.trim(),
        description: projectDescription.trim(),
      });
    }
    setEditMode(false);
  };

  const handleDeleteProject = (e) => {
    e.stopPropagation();
    deleteProject(project.id);
  };

  return (
    <li className={`project-item ${isSelected ? "selected" : ""}`}>
      <div className="project-header" onClick={handleClick}>
        {editMode ? (
          <input
            type="text"
            value={projectName}
            ref={inputRef}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Edit project name"
            maxLength={50}
          />
        ) : (
          <span>{project.name}</span>
        )}

        <div className="project-actions">
          {isSelected && !editMode && (
            <>
              <button className="edit-button" onClick={enableEditMode}>
                Edit
              </button>
              <button className="delete-button" onClick={handleDeleteProject}>
                Delete
              </button>
            </>
          )}
          {!editMode && <span className="tasks-count">{project?.tasks?.length ?? "0"} task(s)</span>}
          {editMode && (
            <button className="save-project-button" onClick={saveChanges}>
              Save
            </button>
          )}
          <div>
            <span className={`arrow-icon ${isSelected ? "opened-project" : ""}`}>
              {isSelected ? "▼" : "▶"}
            </span>
          </div>
        </div>
      </div>

      {/* Conditionally show description */}
      {isSelected && (
        <div className="project-description">
          {editMode ? (
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Edit project description"
              rows="3"
            ></textarea>
          ) : (
            <p>{project.description || "No description available"}</p>
          )}
        </div>
      )}
    </li>
  );
};

export default ProjectItem;
