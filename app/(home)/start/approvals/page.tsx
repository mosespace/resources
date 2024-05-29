import { getResources } from "@/actions/resources";
import { ApproveSwitch } from "@/components/dashboard/approve-switch";
import { DeleteBtn } from "@/components/dashboard/delete-btn";
import { getCurrentUser } from "@/lib/authProvider";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function ApproveResource() {
  const user: any = await getCurrentUser();
  const isAdmin = user?.role === "ADMIN";
  if (!isAdmin) {
    return notFound();
  }

  const data = await getResources();
  const resources = data.data;

  const filteredResources = resources?.filter(
    (item) => item.isApproved === false
  );

  return (
    <div className='flex flex-col space-y-4 py-4 justify-center items-center'>
      {filteredResources?.map((resource, index) => (
        <div
          key={resource.id}
          className={`flex flex-col p-8 dark:text-background ${
            index % 2 === 0 ? "bg-white" : "bg-gray-800 text-white"
          } shadow-md hover:shadow-lg rounded-2xl`}
          style={{ maxWidth: "600px" }} // Set maximum width for consistency
        >
          <div className='flex items-center justify-between'>
            <Link
              target='_blank'
              href={resource.url}
              className='flex items-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-10 h-10 p-10 rounded-full border border-blue-100 text-blue-400 bg-blue-50'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
              <span className='flex flex-col ml-3'>
                <span className='font-medium leading-none'>
                  {resource.name}
                </span>
                <p className='text-sm line-clamp-2 leading-snug mt-1 overflow-hidden overflow-ellipsis'>
                  {resource.description}
                </p>
              </span>
            </Link>
            <div className='flex space-x-2'>
              {isAdmin && (
                <span className='ml-4'>
                  <ApproveSwitch
                    resourceId={resource.id}
                    isApproved={resource.isApproved}
                  />
                </span>
              )}

              <DeleteBtn resourceId={resource.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
