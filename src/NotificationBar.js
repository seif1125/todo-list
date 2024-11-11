

export default function NotificationBar({ drafts ,openDraftSideBar}) {
    return (
     
            <div className="notification-bar">
               {drafts.length>0? (   <p>You have {drafts.length} drafted messages!</p> ):(<p>You have no drafted messages!</p>)}
                <div className="notification-actions">
                    <button onClick={openDraftSideBar} className="view-draft-btn">View Draft</button>
                </div>
            </div>
       
    );
}