import React from "react";
import { __ } from "@wordpress/i18n";
import Modal from "@libs/modal";
import useModal from "@libs/modal/useModal";
import DefaultPageLayout from "@/components/DefaultPageLayout";

const Dashboard = () => {
  // Modal examples
  const simpleModal = useModal();
  const formModal = useModal();
  const confirmModal = useModal();
  const fullScreenModal = useModal();

  const handleSubmit = () => {
    alert(__("Form submitted!", "arraysubscription"));
    formModal.close();
  };

  const handleConfirmDelete = () => {
    alert(__("Item deleted!", "arraysubscription"));
    confirmModal.close();
  };

  const breadcrumb = [{ label: __("Dashboard", "arraysubscription") }];

  return (
    <DefaultPageLayout
      title={__("Dashboard", "arraysubscription")}
      subtitle={__(
        "Welcome to ArraySubscription MainAdmin",
        "arraysubscription"
      )}
      breadcrumb={breadcrumb}
    >
      <h2>{__("Modal Component Examples", "arraysubscription")}</h2>
      <p>
        {__(
          "This page demonstrates the reusable Modal component with various sizes and use cases.",
          "arraysubscription"
        )}
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {/* Simple Modal (Small) */}
        <button
          onClick={() => simpleModal.open()}
          className="button button-primary"
        >
          {__("Open Simple Modal (SM)", "arraysubscription")}
        </button>

        {/* Form Modal (Medium) */}
        <button
          onClick={() => formModal.open({ userId: 123 })}
          className="button button-primary"
        >
          {__("Open Form Modal (MD)", "arraysubscription")}
        </button>

        {/* Confirmation Modal (Small) */}
        <button
          onClick={() => confirmModal.open({ itemId: 456 })}
          className="button button-secondary"
        >
          {__("Open Confirm Modal (SM)", "arraysubscription")}
        </button>

        {/* Full Screen Modal (Large) */}
        <button
          onClick={() => fullScreenModal.open()}
          className="button button-secondary"
        >
          {__("Open Full Screen Modal (LG)", "arraysubscription")}
        </button>
      </div>

      {/* Simple Modal */}
      <Modal
        isOpen={simpleModal.isOpen}
        onClose={simpleModal.close}
        size="sm"
        title={__("Simple Modal", "arraysubscription")}
      >
        <p>
          {__(
            "This is a simple modal with small size. Perfect for notifications or simple messages.",
            "arraysubscription"
          )}
        </p>
        <div className="arraysubscription-modal__footer">
          <button onClick={simpleModal.close} className="button">
            {__("Close", "arraysubscription")}
          </button>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        size="md"
        title={__("Edit User", "arraysubscription")}
      >
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
          >
            {__("Name", "arraysubscription")}
          </label>
          <input
            type="text"
            className="arraysubscription-fb-input "
            placeholder={__("Enter name", "arraysubscription")}
            defaultValue={
              formModal.data?.userId ? `User ${formModal.data.userId}` : ""
            }
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
          >
            {__("Email", "arraysubscription")}
          </label>
          <input
            type="email"
            className="arraysubscription-fb-input "
            placeholder={__("Enter email", "arraysubscription")}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
          >
            {__("Bio", "arraysubscription")}
          </label>
          <textarea
            className="arraysubscription-fb-input"
            rows="4"
            placeholder={__("Enter bio", "arraysubscription")}
          />
        </div>
        <div className="arraysubscription-modal__footer">
          <button onClick={formModal.close} className="button">
            {__("Cancel", "arraysubscription")}
          </button>
          <button onClick={handleSubmit} className="button button-primary">
            {__("Save Changes", "arraysubscription")}
          </button>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.close}
        size="sm"
        title={__("Confirm Delete", "arraysubscription")}
      >
        <p>
          {__(
            "Are you sure you want to delete this item? This action cannot be undone.",
            "arraysubscription"
          )}
        </p>
        {confirmModal.data?.itemId && (
          <p style={{ color: "#666", fontSize: "14px" }}>
            {__("Item ID:", "arraysubscription")}{" "}
            <strong>{confirmModal.data.itemId}</strong>
          </p>
        )}
        <div className="arraysubscription-modal__footer">
          <button onClick={confirmModal.close} className="button">
            {__("Cancel", "arraysubscription")}
          </button>
          <button
            onClick={handleConfirmDelete}
            className="button button-primary"
            style={{ background: "#dc3232" }}
          >
            {__("Delete", "arraysubscription")}
          </button>
        </div>
      </Modal>

      {/* Full Screen Modal */}
      <Modal
        isOpen={fullScreenModal.isOpen}
        onClose={fullScreenModal.close}
        size="lg"
        title={__("Large Content Modal", "arraysubscription")}
      >
        <h3>{__("Modal Features", "arraysubscription")}</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            {__(
              "✓ Four sizes: sm (400px), md (600px), lg (800px), full (100vw - 40px)",
              "arraysubscription"
            )}
          </li>
          <li>
            {__(
              "✓ Backdrop click to close (can be disabled)",
              "arraysubscription"
            )}
          </li>
          <li>
            {__("✓ ESC key to close (can be disabled)", "arraysubscription")}
          </li>
          <li>
            {__("✓ Optional close button in header", "arraysubscription")}
          </li>
          <li>
            {__("✓ Smooth fade and scale animations", "arraysubscription")}
          </li>
          <li>
            {__("✓ Portal rendering to document.body", "arraysubscription")}
          </li>
          <li>{__("✓ Prevents body scroll when open", "arraysubscription")}</li>
          <li>
            {__("✓ ARIA attributes for accessibility", "arraysubscription")}
          </li>
          <li>{__("✓ Dark mode support", "arraysubscription")}</li>
          <li>
            {__("✓ useModal hook for state management", "arraysubscription")}
          </li>
        </ul>

        <h3 style={{ marginTop: "24px" }}>
          {__("Usage with useModal Hook", "arraysubscription")}
        </h3>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "16px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`const myModal = useModal();

// Open modal
myModal.open();

// Open with data
myModal.open({ id: 123, name: "John" });

// Access data inside modal
myModal.data?.id

// Close modal
myModal.close();`}
        </pre>

        <div className="arraysubscription-modal__footer">
          <button
            onClick={fullScreenModal.close}
            className="button button-primary"
          >
            {__("Got it!", "arraysubscription")}
          </button>
        </div>
      </Modal>
    </DefaultPageLayout>
  );
};

export default Dashboard;
