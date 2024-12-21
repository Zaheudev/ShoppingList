import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const NotificationPanel = () => {
  const { notifications, setNotifications } = useContext(AuthContext);

  const fetchNotifications = async () => {
    try {
      const response = await api.getNotifications();
      setNotifications(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const acceptInvite = async (e) => {
    try {
      await api.acceptInvite(e.target.id);
      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  const ignore = async (e) => {
    try {
      await api.refuseInvite(e.target.id);
      fetchNotifications();
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="notification-panel">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <div key={notification._id}>
            <li>{notification.message}</li>
            <button id={notification._id} onClick={acceptInvite}>
              Accept
            </button>
            <button id={notification._id} onClick={ignore}>Ignore</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
