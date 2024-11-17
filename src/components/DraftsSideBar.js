import React, { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';

const DraftsSidebar = ({ drafts, isOpen, onClose }) => {
  const { saveDraft, deleteDraft } = useContext(ProjectContext);

  const getProjectName = (projectId, projects) => {
    const project = projects.find((proj) => proj.id === projectId);
    return project ? project.name : 'Unknown Project';
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
                <strong>Project:</strong> {getProjectName||drafts.project}
              </p>
              <p>{draft.description}</p>
              <div className="draft-actions">
                <button
                  onClick={() => saveDraft(draft.id)}
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
