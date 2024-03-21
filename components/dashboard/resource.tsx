import { getResources } from "@/actions/resources";
import { getCurrentUser } from "@/lib/authProvider";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Resource({ data, title }: any) {
  const user = await getCurrentUser();
  const firstName = user?.name?.split(" ")[0];

  return (
    <div className='w-full pb-12 lg:pb-24'>
      <div className='container grid items-start gap-6 px-4 lg:px-0'>
        <div className='flex items-center gap-4'>
          {/* <Link className='flex items-center space-x-2' href='#' target="_blank">
            <ChevronRightIcon className='h-4 w-4' />
            <span className='text-sm font-semibold tracking-wider uppercase'>
              Back to shop
            </span>
          </Link> */}
        </div>
        {user ? (
          <h1 className='text-3xl font-bold tracking-tight'>
            {firstName}, {title}
          </h1>
        ) : (
          <h1 className='text-3xl font-bold tracking-tight'>
            Welcome to Resources 🫡
          </h1>
        )}
        <p className='text-gray-500 dark:text-gray-400'>
          The foundation of your next project. An open source collection of
          quality resources for developers & designers
        </p>
        <div className='grid lg:grid-cols-2 gap-6'>
          {data?.map((res: any) => (
            <Link
              key={res.id}
              className='group relative flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition sm:flex-row sm:items-center sm:gap-4'
              href={res.url}
              target='_blank'
            >
              <span className='absolute top-0 right-0 p-2'>
                <ExternalLink className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition w-4 h-4' />
              </span>
              <span className='aspect-w-4 aspect-h-3 w-full sm:w-1/3'>
                <Image
                  alt='Clothing'
                  className='object-cover'
                  height={300}
                  src='/placeholder.svg'
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </span>
              <span className='flex-1 flex flex-col p-4 sm:p-0'>
                <span className='space-y-1'>
                  <h3 className='font-semibold group-hover:underline'>
                    {res.name}
                  </h3>
                  <p className='text-sm text-gray-500 line-clamp-3 dark:text-gray-400'>
                    {res.description}
                  </p>
                </span>
              </span>

              {/* planing to add this feature */}
              {/* <span className='flex flex-wrap px-2 md:px-0 my-2 md:mt-2'>
                {res.tags.map((tagObj: any, j: any) => (
                  <span
                    key={j}
                    className='bg-gray-200 dark:bg-amber-600 dark:text-white text-gray-800 text-xs px-2 py-1 rounded-full mr-1'
                  >
                    {tagObj.tag}
                  </span>
                ))}

                <span className='bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-1'>
                  {res.price}
                </span>
              </span> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
