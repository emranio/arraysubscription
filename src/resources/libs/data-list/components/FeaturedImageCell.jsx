import React, { useState, useEffect } from "react";
import { buildUrl } from "../../../supports/url";

const FeaturedImageCell = ({ value, restUrl, nonce, size = "thumbnail" }) => {
  const [mediaItem, setMediaItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // featured_media is always a single integer from REST API
    if (!value || value === 0) {
      setMediaItem(null);
      return;
    }

    const mediaId = value;

    // Fetch media details
    const fetchMediaDetails = async () => {
      setLoading(true);
      try {
        const url = buildUrl(`${restUrl}wp/v2/media/${mediaId}`);
        const response = await fetch(url, {
          headers: {
            "X-WP-Nonce": nonce,
          },
        });

        if (!response.ok) {
          console.error(`Failed to fetch media ${mediaId}`);
          setMediaItem(null);
          return;
        }

        const media = await response.json();
        setMediaItem({
          id: media.id,
          url: media.source_url,
          thumbnail:
            media.media_details?.sizes?.thumbnail?.source_url ||
            media.source_url,
          alt: media.alt_text,
        });
      } catch (error) {
        console.error("Error fetching media details:", error);
        setMediaItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaDetails();
  }, [value, restUrl, nonce]);

  if (loading) {
    return (
      <div className="featured-image-placeholder">
        <span className="arraysubscription-dl-loading">Loading...</span>
      </div>
    );
  }

  if (!mediaItem) {
    return (
      <img
        src="https://placehold.co/100x100?text=No+Image"
        alt="No featured image"
        className="featured-image-img"
      />
    );
  }

  return (
    <img
      src={mediaItem.thumbnail || mediaItem.url}
      alt={mediaItem.alt || "Featured image"}
      className="featured-image-img"
    />
  );
};

export default FeaturedImageCell;
