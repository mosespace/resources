import CategoryCreate from "@/components/dashboard/category-create";
import { getCurrentUser } from "@/lib/authProvider";
import React from "react";

export default async function page() {
  const user = await getCurrentUser();

  return (
    <div className=''>
      <CategoryCreate user={user} />
    </div>
  );
}
