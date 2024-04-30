import { getResources } from "@/actions/resources";
import { getCategories } from "@/actions/categories";

export default async function sitemap() {
  const baseUrl = "https://resources.mosespace.com";
  // Step 1: Finding required params to fetch
  const resources = await getResources();
  const categories = await getCategories();

  const categoryUrls =
    categories?.map((category) => {
      return {
        url: `${baseUrl}/start/c/${category.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  //   const blogs = await getBlogs();
  //   const blogUrls =
  //     blogs?.map((blog) => {
  //       return {
  //         url: `${baseUrl}/blogs/${blog.slug}`,
  //         lastModified: new Date(),
  //       };
  //     }) ?? [];
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
    },
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/projects`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/services`,
    //   lastModified: new Date(),
    // },
    ...categoryUrls,
  ];
}
