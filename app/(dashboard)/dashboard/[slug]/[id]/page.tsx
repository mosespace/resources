import { findCategory } from "@/actions/resources";
import CategoryCreate from "@/components/dashboard/category-crud";
import { getCurrentUser } from "@/lib/authProvider";
import React from "react";

export default async function page({ params: { id } }: any) {
  const user = await getCurrentUser();
  const initialData = await findCategory(id);
  return (
    <div className=''>
      <CategoryCreate initialData={initialData} user={user} />
    </div>
  );
}
