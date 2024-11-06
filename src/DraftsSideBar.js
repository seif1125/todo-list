const DraftsSidebar = ({ drafts, isOpen, onClose, onDeleteDraft, onSaveDraft }) => {
    return (
      <div className={`drafts-sidebar ${isOpen ? 'opened' : ''}`}>
        <div className="drafts-header">
          <h3>Drafted Tasks</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <ul className="drafts-list">
          {drafts.length > 0 ? (
            drafts.map((draft, index) => (
              <li key={index} className="draft-item">
                <h4>{draft.title}</h4>
                <p><strong>Project:</strong> {draft.projectName}</p> {/* Display the project name */}
                <p>{draft.description}</p>
  
                <div className="draft-actions">
                  <button onClick={() => onSaveDraft(draft.id)} className="save-button">
                    Save
                  </button>
                  <button onClick={() => onDeleteDraft(draft.id)} className="delete-button">
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
  