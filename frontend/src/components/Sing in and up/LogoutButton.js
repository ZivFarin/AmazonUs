/**this page creates the logput button for a user with 10 min auto logout timer */
import React, { useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styles from "./LogoutButton.module.css";

function LogoutButton() {
  const history = useHistory();
  const timeoutRef = useRef(null);

  const handleLogout = useCallback(() => {
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn"); 
    // Clear the timeout
    clearTimeout(timeoutRef.current); 
    // Redirect to login page
    history.push("/Login"); 
    history.go(0);
  }, [history]);

  const resetTimeout = useCallback(() => {
    clearTimeout(timeoutRef.current);
    // 10 minutes timeout for auto logout
    timeoutRef.current = setTimeout(handleLogout, 10 * 60 * 1000); 
  }, [handleLogout]);

  useEffect(() => {
    resetTimeout();

    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart"];
    const onActivity = () => resetTimeout();
    activityEvents.forEach((event) => {
      document.addEventListener(event, onActivity);
    });

    return () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, onActivity);
      });
      clearTimeout(timeoutRef.current);
    };
  }, [resetTimeout]);

  return (
    <div className={styles["logout-button-container"]}>
      <button className={styles["logout-button"]} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
