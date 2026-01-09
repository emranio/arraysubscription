import { __ } from "@wordpress/i18n";
import DefaultPageLayout from "@/components/DefaultPageLayout";

const Help = () => {
  const breadcrumb = [
    { label: __("Help & Documentation", "arraysubscription") },
  ];

  return (
    <DefaultPageLayout
      title={__("Help & Documentation", "arraysubscription")}
      subtitle={__(
        "Get help and learn about ArraySubscription features",
        "arraysubscription"
      )}
      breadcrumb={breadcrumb}
    >
      <div className="arraysubscription-page-content">help</div>
    </DefaultPageLayout>
  );
};

export default Help;
