import React from "react";
import { __ } from "@wordpress/i18n";
import "./skeleton.scss";

/**
 * Skeleton Component
 * Displays loading placeholders with various shapes and sizes
 *
 * @param {object} props
 * @param {string} props.variant - 'line' | 'circle' | 'rectangle'
 * @param {string|number} props.width - CSS width value
 * @param {string|number} props.height - CSS height value
 * @param {string} props.className - Additional CSS classes
 * @param {object} props.style - Inline styles
 * @returns {JSX.Element}
 */
export function Skeleton({
  variant = "line",
  width,
  height,
  className = "",
  style = {},
}) {
  const baseClass = "arraysubscription-skeleton";
  const variantClass = `${baseClass}--${variant}`;

  const skeletonStyle = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
  };

  return (
    <div
      className={`${baseClass} ${variantClass} ${className}`}
      style={skeletonStyle}
      aria-label={__("Loading...", "arraysubscription")}
    />
  );
}

/**
 * Skeleton Text Component
 * Displays multiple lines of skeleton text
 *
 * @param {object} props
 * @param {number} props.lines - Number of lines to display
 * @param {string|number} props.width - Width of lines (can be array for different widths)
 * @param {string|number} props.height - Height of each line
 * @param {string|number} props.spacing - Gap between lines
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function SkeletonText({
  lines = 3,
  width = "100%",
  height = 14,
  spacing = 8,
  className = "",
}) {
  const widths = Array.isArray(width) ? width : Array(lines).fill(width);
  const spacingValue = typeof spacing === "number" ? `${spacing}px` : spacing;

  return (
    <div
      className={`arraysubscription-skeleton-text ${className}`}
      style={{ gap: spacingValue }}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="line"
          width={widths[index] || width}
          height={height}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Card Component
 * Displays a card-shaped skeleton with optional avatar
 *
 * @param {object} props
 * @param {boolean} props.hasAvatar - Whether to show avatar
 * @param {number} props.avatarSize - Size of avatar
 * @param {number} props.lines - Number of text lines
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function SkeletonCard({
  hasAvatar = false,
  avatarSize = 40,
  lines = 3,
  className = "",
}) {
  return (
    <div className={`arraysubscription-skeleton-card ${className}`}>
      {hasAvatar && (
        <Skeleton variant="circle" width={avatarSize} height={avatarSize} />
      )}
      <div className="arraysubscription-skeleton-card__content">
        <SkeletonText lines={lines} width={["80%", "60%", "70%"]} />
      </div>
    </div>
  );
}

/**
 * Skeleton Message Component
 * Displays a message-shaped skeleton for chat interfaces
 *
 * @param {object} props
 * @param {number} props.lines - Number of message lines
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function SkeletonMessage({ lines = 2, className = "" }) {
  return (
    <div className={`arraysubscription-skeleton-message ${className}`}>
      <SkeletonText
        lines={lines}
        width={lines === 1 ? "70%" : ["80%", "60%"]}
        height={14}
        spacing={8}
      />
    </div>
  );
}

/**
 * Chat Window Skeleton Component
 * Displays a full chat window skeleton
 *
 * @returns {JSX.Element}
 */
export function ChatWindowSkeleton() {
  return (
    <div className="arraysubscription-chat-window arraysubscription-chat-window--floating arraysubscription-chat-window--skeleton">
      <div className="arraysubscription-chat-window__header">
        <Skeleton variant="line" width={120} height={16} />
        <div className="arraysubscription-chat-window__header-actions">
          <Skeleton variant="circle" width={28} height={28} />
          <Skeleton variant="circle" width={28} height={28} />
          <Skeleton variant="circle" width={28} height={28} />
        </div>
      </div>
      <div className="arraysubscription-chat-window__body">
        <div
          className="arraysubscription-chat-window__messages"
          style={{ padding: "16px" }}
        >
          <SkeletonMessage lines={2} />
          <SkeletonMessage lines={2} />
          <SkeletonMessage lines={1} />
        </div>
      </div>
    </div>
  );
}

/**
 * Page Skeleton Component
 * Displays a full page skeleton with header and content
 *
 * @param {object} props
 * @param {boolean} props.hasHeader - Whether to show header skeleton
 * @param {number} props.cards - Number of card skeletons to show
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function PageSkeleton({ hasHeader = true, cards = 3, className = "" }) {
  return (
    <div className={`arraysubscription-page-skeleton ${className}`}>
      {hasHeader && (
        <div className="arraysubscription-page-skeleton__header">
          <Skeleton variant="line" width={200} height={24} />
          <Skeleton variant="line" width={300} height={14} />
        </div>
      )}
      <div className="arraysubscription-page-skeleton__content">
        {Array.from({ length: cards }).map((_, index) => (
          <SkeletonCard key={index} lines={3} />
        ))}
      </div>
    </div>
  );
}
