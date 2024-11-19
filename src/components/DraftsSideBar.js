import React, { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';

const DraftsSidebar = ({ drafts, isOpen, onClose ,projects}) => {
  const { saveDraft, deleteDraft } = useContext(ProjectContext);

  const getProjectName = (draft) => {
    const project = projects.find((proj) => proj.id === draft.projectId);
    return project ? project.name : draft.projectName;
  };

  return (
    <div className={`drafts-sidebar ${isOpen ? 'opened' : ''}`}>
      <div className="drafts-header">
        <h3>Drafted Tasks</h3>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
      <ul className="drafts-list">
        {drafts.length > 0 ? (
          drafts.map((draft) => (
            <li key={draft.id} className="draft-item">
              <h4>{draft.title}</h4>
              <p>
                <strong>Project:</strong> {getProjectName(draft)}
              </p>
              <p>{draft.description}</p>
              <div className="draft-actions">
                <button
                  onClick={() => saveDraft(draft)}
                  className="save-button"
                >
                  Save
                </button>
                <button
                  onClick={() => deleteDraft(draft.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No drafts available.</p>
        )}
      </ul>
    </div>
  );
};

export default DraftsSidebar;
