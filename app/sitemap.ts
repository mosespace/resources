import { getResources } from "@/actions/resources";
import { getCategories } from "@/actions/categories";

export default async function sitemap() {
  const baseUrl = "https://resources.mosespace.com";
  // Step 1: Finding required params to fetch
  const resources = await getResources();
  const categories: any = await getCategories();

  const categoryUrls =
    categories?.map((category: any) => ({
      url: `${baseUrl}/start/c/${encodeURIComponent(category.slug)}`,
      lastModified: new Date(),
    })) ?? [];

  // console.log(categoryUrls)

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
    },
    ...categoryUrls,
  ];
}
