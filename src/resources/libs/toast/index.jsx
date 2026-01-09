import React, { useState, useEffect } from "react";
import "./toast.scss";

/**
 * Toast Component
 * Simple toast notification component
 *
 * @param {Object} props
 * @param {string} props.message - Toast message
 * @param {string} props.type - Toast type: 'success' | 'error' | 'info' | 'warning'
 * @param {number} props.duration - Auto-hide duration in ms (default: 3000)
 * @param {Function} props.onClose - Callback when toast closes
 */
const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return (
    <div
      className={`arraysubscription-toast arraysubscription-toast--${type} ${
        isVisible
          ? "arraysubscription-toast--visible"
          : "arraysubscription-toast--hidden"
      }`}
    >
      <div className="arraysubscription-toast__content">
        <span className="arraysubscription-toast__icon">
          {type === "success" && "✓"}
          {type === "error" && "✕"}
          {type === "warning" && "⚠"}
          {type === "info" && "ℹ"}
        </span>
        <span className="arraysubscription-toast__message">{message}</span>
        <button
          className="arraysubscription-toast__close"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

/**
 * Toast Container Component
 * Manages multiple toasts
 */
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="arraysubscription-toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
