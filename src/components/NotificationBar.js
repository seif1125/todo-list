import React from "react";

const NotificationBar = ({ drafts, openDraftSideBar }) => {
  const draftCount = drafts.length;

  return (
    <div className="notification-bar">
      <p>
        {draftCount > 0
          ? `You have ${draftCount} drafted message${draftCount > 1 ? "s" : ""}!`
          : "You have no drafted messages!"}
      </p>
      <div className="notification-actions">
        {draftCount > 0 && (
          <button
            onClick={openDraftSideBar}
            className="view-draft-btn"
            aria-label="View Drafts"
          >
            View Draft{draftCount > 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationBar;
