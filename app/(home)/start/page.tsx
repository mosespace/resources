import { getCategories, getResources } from "@/actions/resources";
import ResourcesListing from "@/components/resources-listing";

import React from "react";

export default async function page() {
  const resources = await getResources();
  const categories = await getCategories();

  const approvedResources = resources?.filter(
    (approved_resource) => approved_resource.isApproved === true
  );
  return (
    <section>
      <ResourcesListing data={approvedResources} categories={categories} />
    </section>
  );
}
