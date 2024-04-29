import { getResources } from "@/actions/resources";
import { getCategories } from "@/actions/categories";
import Resource from "@/components/dashboard/resource";
import { getCurrentUser } from "@/lib/authProvider";
import React from "react";

export default async function page() {
  const resources = await getResources();

  const approvedResources = resources?.filter(
    (approved_resource) => approved_resource.isApproved === true
  );

  const categories = await getCategories();

  const user: any = await getCurrentUser();

  return (
    <div className='flex flex-col space-y-4'>
      <Resource
        data={approvedResources}
        categories={categories}
        title='Welcome to Resources 🫡'
      />
    </div>
  );
}
