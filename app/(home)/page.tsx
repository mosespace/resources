import { getResources } from "@/actions/resources";
import { getCategories } from "@/actions/categories";
import { fetchOGImage } from "@/actions/images";
import ResourcesListing from "@/components/resources-listing";

import React from "react";
import HeadingSection from "@/components/heading-section";

export default async function page() {
  // Fetch resources and categories
  const resources = await getResources();

  // Filter approved resources
  const approvedResources = resources.data?.filter(
    (approved_resource) => approved_resource.isApproved === true
  );

  // Ensure approvedResources is not null or undefined
  if (!approvedResources || approvedResources.length === 0) {
    return (
      <section>
        <ResourcesListing data={[]} initialOgImages={[]} />
      </section>
    );
  }

  // Fetch OG images for approved resources
  const urls = approvedResources.map((resource) => resource.url);
  let ogImages: any = [];

  try {
    ogImages = await Promise.all(urls?.map((url) => fetchOGImage(url)));
  } catch (error) {
    console.error("Error fetching OG images:", error);
  }

  return (
    <section>
      <div>
        <HeadingSection data={approvedResources} />
      </div>

      <ResourcesListing data={approvedResources} initialOgImages={ogImages} />
    </section>
  );
}
