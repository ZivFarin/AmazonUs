import React, { useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styles from "./LogoutButton.module.css";

function LogoutButton() {
  const history = useHistory();
  const timeoutRef = useRef(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("isLoggedIn"); // Remove isLoggedIn flag from localStorage
    clearTimeout(timeoutRef.current); // Clear the timeout
    history.push("/Login"); // Redirect to login page
    history.go(0);
  }, [history]);

  const resetTimeout = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleLogout, 10 * 60 * 1000); // 10 minutes in milliseconds
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
