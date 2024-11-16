import { ProjectContext } from './App';
import React, { useContext } from 'react';
const DraftsSidebar = ({ drafts, projects, isOpen, onClose, onDeleteDraft, }) => {
  const {handleSaveDraft,handleDeleteDraft} = useContext(ProjectContext);
  // Helper function to get project name from draft's projectId
  
  const getProjectNameAndStatus = (projectId) => {
    const project = projects.find((proj) => proj.id === projectId);
    if (project) {
      return { name: project.name, exists: true };
    }
    
    return { name: drafts.find((draft) => draft.projectId === projectId)?.projectName||'unknown', exists: false };
  };

  return (
    <div className={`drafts-sidebar ${isOpen ? 'opened' : ''}`}>
      <div className="drafts-header">
        <h3>Drafted Tasks</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <ul className="drafts-list">
        {drafts.length > 0 ? (
          drafts.map((draft, index) => {
            const { name, exists } = getProjectNameAndStatus(draft.projectId);

            return (
              <li key={index} className="draft-item">
                <h4>{draft.title}</h4>
                <p>
                  <strong>Project:</strong> {name}
                </p>
                <p>{draft.description}</p>

                {/* Disclaimer for Unknown Project */}
                {!exists && (
                  <p className="disclaimer">
                    This project has been removed. Saving this draft will create a new project with this name.
                  </p>
                )}

                <div className="draft-actions">
                  <button onClick={() => handleSaveDraft(draft.id)} className="save-button">
                    Save
                  </button>
                  <button onClick={() => handleDeleteDraft(draft.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p>No drafts available.</p>
        )}
      </ul>
    </div>
  );
};

export default DraftsSidebar;
