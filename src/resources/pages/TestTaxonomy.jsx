import React from "react";
import { __ } from "@wordpress/i18n";
import DataList from "@libs/data-list";
import TableView from "@libs/data-list/TableView";
import DefaultPageLayout from "@/components/DefaultPageLayout";

/**
 * TestTaxonomy Page
 *
 * Displays all test taxonomies using DataList with TableView.
 */
const TestTaxonomy = () => {
  return (
    <DefaultPageLayout
      title={__("Test Taxonomies", "arraysubscription")}
      subtitle={__(
        "Manage test taxonomies and their metadata",
        "arraysubscription"
      )}
    >
      <DataList
        cptSlug="test_taxonomy"
        addUrl="/test-taxonomy/form"
        editUrl="/test-taxonomy/form"
        dataSource="taxonomy"
        viewComponent={TableView}
        labels={{
          singular: __("Taxonomy", "arraysubscription"),
          plural: __("Taxonomies", "arraysubscription"),
        }}
        allowedActions={["edit", "delete"]}
        perPage={20}
        restUrl={window?.arraySubscription?.env?.apiBaseUrl}
        nonce={window?.arraySubscription?.env?.nonce}
        columns={["count"]}
        metaColumns={["category", "priority", "is_featured", "color"]}
        columnFormats={{
          category: "string",
          priority: "number",
          is_featured: {
            type: "bool",
            texts: {
              true: __("Yes", "arraysubscription"),
              false: __("No", "arraysubscription"),
            },
          },
          color: "string",
          count: "number",
        }}
        statusList={[{ status: "all", label: __("All", "arraysubscription") }]}
      />
    </DefaultPageLayout>
  );
};

export default TestTaxonomy;
