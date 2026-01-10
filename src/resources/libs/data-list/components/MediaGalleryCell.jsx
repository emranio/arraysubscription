import React, { useState, useEffect } from "react";
import { buildUrl } from "../../url";

const MediaGalleryCell = ({ value, restUrl, nonce }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value && value !== 0) {
      setMediaItems([]);
      return;
    }

    let mediaIds = [];
    try {
      // Handle different value formats:
      // - JSON array string: "[9,7]"
      // - Single integer: 10
      // - Single string number: "10"
      // - Array: [9, 7]
      if (typeof value === "number") {
        mediaIds = value ? [value] : [];
      } else if (typeof value === "string") {
        if (value.startsWith("[")) {
          // JSON array string
          mediaIds = JSON.parse(value);
        } else {
          // Single string number
          const parsed = parseInt(value, 10);
          mediaIds = !isNaN(parsed) && parsed ? [parsed] : [];
        }
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

    // Fetch media details
    const fetchMediaDetails = async () => {
      setLoading(true);
      try {
        const mediaPromises = mediaIds.slice(0, 3).map(async (id) => {
          const url = buildUrl(`${restUrl}wp/v2/media/${id}`);
          const response = await fetch(url, {
            headers: {
              "X-WP-Nonce": nonce,
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
  }, [value, restUrl, nonce]);

  if (loading) {
    return <span className="arraysubscription-dl-loading">Loading...</span>;
  }

  if (mediaItems.length === 0) {
    return <span className="arraysubscription-dl-empty">No images</span>;
  }

  let totalCount = 0;
  try {
    if (typeof value === "number") {
      totalCount = value ? 1 : 0;
    } else if (typeof value === "string") {
      if (value.startsWith("[")) {
        const ids = JSON.parse(value);
        totalCount = Array.isArray(ids) ? ids.length : 0;
      } else {
        totalCount = parseInt(value, 10) ? 1 : 0;
      }
    } else if (Array.isArray(value)) {
      totalCount = value.length;
    }
  } catch (e) {
    totalCount = 0;
  }

  return (
    <div className="arraysubscription-dl-media-images">
      {mediaItems.map((media) => (
        <img
          key={media.id}
          src={media.thumbnail || media.url}
          alt={media.alt || "Media"}
        />
      ))}
      {totalCount > 3 && (
        <span className="arraysubscription-dl-media-gallery__count">
          +{totalCount - 3}
        </span>
      )}
    </div>
  );
};

export default MediaGalleryCell;
