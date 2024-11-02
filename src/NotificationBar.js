

export default function NotificationBar({ message, isVisible }) {
    return (
        isVisible && (
            <div className="notification-bar">
                <p>{message}</p>
                <div className="notification-actions">
                    <button className="view-draft-btn">View Draft</button>
                    <span className="close-icon" >&times;</span>
                </div>
            </div>
        )
    );
}