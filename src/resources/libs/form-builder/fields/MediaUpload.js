import React, { useState, useEffect } from "react";
import FieldBase from "../utils/FieldBase";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { buildUrl } from "../../url";
import { Loader2, PlusIcon, X } from "lucide-react";

// Sortable thumbnail item
const SortableThumbnail = ({ id, media, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="arraysubscription-fb-media-upload-thumbnail"
    >
      <div
        className="arraysubscription-fb-media-upload-thumbnail-drag"
        {...attributes}
        {...listeners}
      >
        <img
          src={media.thumbnail || media.url}
          alt={media.alt || "Media"}
          className="arraysubscription-fb-media-upload-thumbnail-image"
        />
      </div>
      <button
        type="button"
        className="arraysubscription-fb-media-upload-thumbnail-remove"
        onClick={handleRemoveClick}
      >
        <X size={16} />
      </button>
    </div>
  );
};

// Inner component that receives value and onChange from rc-field-form
const MediaUploadInner = ({ value, onChange, multiple = false }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Parse value and fetch media details
  useEffect(() => {
    if (!value && value !== 0) {
      setMediaItems([]);
      return;
    }

    let mediaIds = [];
    try {
      // Handle single value (integer or string number) for non-multiple
      if (
        !multiple &&
        (typeof value === "number" ||
          (typeof value === "string" && !value.startsWith("[")))
      ) {
        const singleId = parseInt(value, 10);
        mediaIds = singleId ? [singleId] : [];
      } else if (typeof value === "string") {
        // Parse JSON string if needed
        mediaIds = value ? JSON.parse(value) : [];
      } else if (Array.isArray(value)) {
        mediaIds = value;
      }
    } catch (e) {
      console.error("Error parsing media_upload value:", e);
      mediaIds = [];
    }

    if (mediaIds.length === 0) {
      setMediaItems([]);
      return;
    }

    // Fetch media details from WordPress API
    const fetchMediaDetails = async () => {
      setLoading(true);
      try {
        const mediaPromises = mediaIds.map(async (id) => {
          const url = buildUrl(
            `${window?.arraySubscription?.env?.apiBaseUrl}wp/v2/media/${id}`
          );
          const response = await fetch(url, {
            headers: {
              "X-WP-Nonce": window?.arraySubscription?.env?.nonce,
            },
          });

          if (!response.ok) {
            console.error(`Failed to fetch media ${id}`);
            return null;
          }

          const media = await response.json();
          return {
            id: media.id,
            url: media.source_url,
            thumbnail:
              media.media_details?.sizes?.thumbnail?.source_url ||
              media.source_url,
            alt: media.alt_text,
          };
        });

        const mediaDetails = await Promise.all(mediaPromises);
        setMediaItems(mediaDetails.filter((m) => m !== null));
      } catch (error) {
        console.error("Error fetching media details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaDetails();
  }, [value]);

  // Open WordPress media library
  const handleOpenMediaLibrary = () => {
    if (!window.wp || !window.wp.media) {
      alert("WordPress media library is not available");
      return;
    }

    const frame = window.wp.media({
      title: multiple ? "Select Images" : "Select Image",
      button: {
        text: "Use selected images",
      },
      multiple: multiple,
      library: {
        type: "image",
      },
    });

    // When images are selected
    frame.on("select", () => {
      const selection = frame.state().get("selection");
      const selected = selection.toJSON();

      const newMediaItems = selected.map((attachment) => ({
        id: attachment.id,
        url: attachment.url,
        thumbnail: attachment.sizes?.thumbnail?.url || attachment.url,
        alt: attachment.alt,
      }));

      let updatedMedia;
      if (multiple) {
        // Add to existing items
        updatedMedia = [...mediaItems, ...newMediaItems];
      } else {
        // Replace with single item
        updatedMedia = [newMediaItems[0]];
      }

      setMediaItems(updatedMedia);

      // Update form value - single integer for non-multiple, JSON string for multiple
      if (multiple) {
        const mediaIds = updatedMedia.map((m) => m.id);
        onChange(JSON.stringify(mediaIds));
      } else {
        onChange(updatedMedia[0]?.id || 0);
      }
    });

    frame.open();
  };

  // Handle thumbnail removal
  const handleRemove = (mediaId) => {
    const updatedMedia = mediaItems.filter((m) => m.id !== mediaId);
    setMediaItems(updatedMedia);

    // Update form value - single integer for non-multiple, JSON string for multiple
    if (multiple) {
      const mediaIds = updatedMedia.map((m) => m.id);
      onChange(mediaIds.length > 0 ? JSON.stringify(mediaIds) : "");
    } else {
      onChange(updatedMedia[0]?.id || 0);
    }
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = mediaItems.findIndex((item) => item.id === active.id);
      const newIndex = mediaItems.findIndex((item) => item.id === over.id);

      const reorderedMedia = arrayMove(mediaItems, oldIndex, newIndex);
      setMediaItems(reorderedMedia);

      // Update form value - single integer for non-multiple, JSON string for multiple
      if (multiple) {
        const mediaIds = reorderedMedia.map((m) => m.id);
        onChange(JSON.stringify(mediaIds));
      } else {
        onChange(reorderedMedia[0]?.id || 0);
      }
    }
  };

  return (
    <div className="arraysubscription-fb-media-upload-field">
      <div className="arraysubscription-fb-media-uploads-wrap">
        {mediaItems.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={mediaItems.map((m) => m.id)}
              strategy={rectSortingStrategy}
            >
              <div className="arraysubscription-fb-media-upload-thumbnails">
                {mediaItems.map((media) => (
                  <SortableThumbnail
                    key={media.id}
                    id={media.id}
                    media={media}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
        {(multiple || mediaItems.length < 1) && (
          <div
            className="arraysubscription-fb-media-upload-thumbnail"
            style={{ marginTop: "12px" }}
          >
            <div
              type="button"
              role="button"
              onClick={handleOpenMediaLibrary}
              className="arraysubscription-fb-media-upload-add-button"
            >
              {/* if loading show a spinning lucide icon */}
              {loading ? <Loader2 className="lucide-spin" /> : <PlusIcon />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// MediaUpload field component
const MediaUploadField = ({
  label,
  name,
  rules = [],
  inline = false,
  help,
  multiple = false,
  ...rest
}) => {
  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
    >
      {(control) => (
        <MediaUploadInner
          value={control.value}
          onChange={control.onChange}
          multiple={multiple}
        />
      )}
    </FieldBase>
  );
};

export default MediaUploadField;
