

export default function NotificationBar({ isVisible ,openDraftSideBar}) {
    return (
     
            <div className="notification-bar">
               {isVisible ? (   <p>You have drafted messages!</p> ):(<p>You have no drafted messages!</p>)}
                <div className="notification-actions">
                    <button onClick={openDraftSideBar} className="view-draft-btn">View Draft</button>
                </div>
            </div>
       
    );
}