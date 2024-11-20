import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NotificationPanel = () => {
  const { notifications } = useContext(AuthContext);

  return (
    <div className="notification-panel">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
