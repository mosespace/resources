import { getResources } from "@/actions/resources";
import Resource from "@/components/dashboard/resource";
import React from "react";

export default async function page() {
  const resources = await getResources();

  const approvedResources = resources?.filter(
    (approved_resource) => approved_resource.isApproved === true
  );
  return (
    <div className='flex flex-col space-y-4'>
      <Resource data={approvedResources} title="Welcome to Resources 🫡"/>
    </div>
  );
}
