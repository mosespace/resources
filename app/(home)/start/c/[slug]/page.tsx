import { getResources } from "@/actions/resources";
import { getCategories } from "@/actions/categories";
import ResourcesListing from "@/components/resources-listing";

export default async function page({ params: { slug } }: any) {
  // Step 1: Finding required params to fetch
  const resources = await getResources();
  const categories = await getCategories();

  // Step 2: Find the category with the matching slug
  const filteredCategory = categories?.find(
    (category) => category.slug === slug
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

  // Step 3: Output the filtered category and resources
  // console.log("Filtered Category:", filteredCategory);
  // console.log("Filtered Resources:", filteredResources);
  return <ResourcesListing data={filteredResources} categories={categories} />;
}
