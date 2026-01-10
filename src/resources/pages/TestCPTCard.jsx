import React from "react";
import { __ } from "@wordpress/i18n";
import DataList from "@libs/data-list";
import Card from "@libs/data-list/CardView";
import { buildUrl } from "../libs/url";
import DefaultPageLayout from "@/components/DefaultPageLayout";

/**
 * TestCPTCard Page
 *
 * Displays all test post types using DataList with CardView.
 * Card clicks navigate to edit form.
 */
const TestCPTCard = () => {
  return (
    <DefaultPageLayout
      title={__("Post Types - Card View", "arraysubscription")}
      subtitle={__("Manage post types in card layout", "arraysubscription")}
    >
      <DataList
        cptSlug="test_cpt"
        addUrl="/test-cpt/form"
        editUrl="/test-cpt/form"
        dataSource="post_type" // taxonomy or post_type or null >> default to post_type
        viewComponent={Card}
        labels={{
          singular: __("Post Type", "arraysubscription"),
          plural: __("Post Types", "arraysubscription"),
        }}
        allowedActions={["edit", "trash", "restore", "delete"]}
        perPage={12}
        restUrl={window?.arraySubscription?.env?.apiBaseUrl}
        nonce={window?.arraySubscription?.env?.nonce}
        isFeaturedImage={true}
        customActions={[
          {
            name: "duplicate",
            label: __("Duplicate", "arraysubscription"),
            callback: async (itemId) => {
              const url = buildUrl(
                `${window?.arraySubscription?.env?.apiBaseUrl}arraysubscription/v1/test_cpt/${itemId}/duplicate`
              );
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "X-WP-Nonce": window?.arraySubscription?.env?.nonce,
                  "Content-Type": "application/json",
                },
              });

              if (!response.ok) {
                throw new Error(
                  __("Failed to duplicate post type", "arraysubscription")
                );
              }

              alert(
                __("Post type duplicated successfully!", "arraysubscription")
              );
            },
          },
        ]}
      />
    </DefaultPageLayout>
  );
};

export default TestCPTCard;
