import { fetchOGImage } from "@/actions/images";
import { getResources } from "@/actions/resources";
import { getCategories } from "@/actions/categories";
import ResourcesListing from "@/components/resources-listing";

export default async function page({ params: { slug } }: any) {
  // Step 1: Finding required params to fetch
  const resources = await getResources();
  const categories = await getCategories();

  // Step 2: Find the category with the matching slug
  const filteredCategory = categories?.find(
    (category) => category.slug === decodeURIComponent(slug)
  );

  // Step 3: Setting the categoryId
  const categoryId = filteredCategory?.id;

  // Step 4: If category is found, filter resources belonging to that category with isApproved === true
  let filteredResources: any = [];
  if (filteredCategory) {
    filteredResources = resources?.filter(
      (resource) =>
        resource?.categoryId === categoryId && resource.isApproved === true
    );
  }

  // Fetching OG images for approved filteredResources
  const urls = filteredResources.map((resource: any) => resource.url);
  let ogImages: any = [];

  try {
    ogImages = await Promise.all(urls?.map((url: string) => fetchOGImage(url)));
  } catch (error) {
    console.error("Error fetching OG images:", error);
  }

  return (
    <ResourcesListing data={filteredResources} initialOgImages={ogImages} />
  );
}
