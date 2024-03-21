import { getCategories, getResources } from "@/actions/resources";
import Resource from "@/components/dashboard/resource";
import Newsletter from "@/components/newsletter";
import React from "react";

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

  return (
    <div className='flex flex-col space-y-4'>
      <Resource
        data={filteredResources}
        title={`These Are ${filteredCategory?.name} 🎉😲`}
      />

      <div className='flex items-center pb-8 justify-center'>
        {filteredResources?.length === 0 && (
          <div className='flex flex-col'>
            <div className='flex max-w-lg flex-row-reverse items-end gap-4'>
              <img
                src='/developer.jpg'
                alt='Kisakye Moses also known as Uncle Moses || mosespace a fullstack developer from Kampala Uganda building SAAS for the future.'
                className='size-20 rounded-lg object-cover'
              />

              <div>
                <h3 className='text-lg/tight font-medium dark:text-orange-500 text-gray-900'>
                  Hi, it seems you wanted {filteredCategory?.name} 😢
                </h3>

                <p className='mt-0.5 text-gray-700'>
                  Am currently working alone and so hard to see that this comes
                  to life. give me a few minutes and check back. Everything will
                  be here. Thank you.🫶
                </p>
              </div>
            </div>
            {/* <Newsletter /> */}
          </div>
        )}
      </div>

      <Newsletter />
    </div>
  );
}
