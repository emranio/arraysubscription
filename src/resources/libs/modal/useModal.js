import { useState, useCallback } from "react";

/**
 * Hook for managing modal state
 *
 * @param {boolean} initialState - Initial open state
 * @returns {object} Modal state and controls
 *
 * @example
 * const myModal = useModal();
 * myModal.open({ id: 123 }); // Open with data
 * myModal.close(); // Close modal
 * myModal.data; // Access passed data
 */
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState(null);

  const open = useCallback((modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Clear data after animation completes
    setTimeout(() => setData(null), 150);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setData,
  };
};

export default useModal;
