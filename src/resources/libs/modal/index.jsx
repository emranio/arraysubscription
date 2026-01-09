import React, { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./modal.scss";

/**
 * Reusable Modal Component
 *
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal closes
 * @param {string} size - Modal size: "sm", "md", "lg", "full"
 * @param {string} title - Modal header title (optional)
 * @param {node} children - Modal content
 * @param {boolean} closeOnBackdrop - Close when clicking backdrop
 * @param {boolean} closeOnEsc - Close on ESC key press
 * @param {boolean} showCloseButton - Show X button in header
 * @param {string} className - Additional CSS class
 */
const Modal = ({
  isOpen,
  onClose,
  size = "md",
  title,
  children,
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = "",
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle lifecycle for animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Use setTimeout to ensure browser paints initial state before adding visible class
      // This fixes the "no incoming animation" issue
      const timer = setTimeout(() => setIsVisible(true), 10);

      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);

      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = "";
      }, 200); // Match CSS transition duration (reduced for snappier feel)

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key
  const handleKeyDown = useCallback(
    (e) => {
      if (closeOnEsc && e.key === "Escape") {
        onClose?.();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!isRendered) return null;

  return createPortal(
    <div
      className={`arraysubscription-modal-backdrop ${
        isVisible ? "arraysubscription-modal--visible" : ""
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`arraysubscription-modal arraysubscription-modal--${size} ${className}`}
      >
        {(title || showCloseButton) && (
          <div className="arraysubscription-modal__header">
            {title && (
              <h2 id="modal-title" className="arraysubscription-modal__title">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="arraysubscription-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className="arraysubscription-modal__content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
