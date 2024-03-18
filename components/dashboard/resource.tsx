import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Resource() {
  const data = [
    {
      id: "128jm",
      title: "18F Accessibility Checklist",
      description: "The description is being reviewed.",
      tags: [
        {
          tag: "Accessibility",
        },
        {
          tag: "Tailwind",
        },
      ],
      price: "Free",
      path: "https://guides.18f.gov/accessibility/checklist/",
    },
    {
      id: "129jm",
      title: "1000 Inspiring Websites",
      description:
        "A growing list of websites that are memorable, clear and delightful.",
      tags: [
        {
          tag: "Design",
        },
        {
          tag: "UI/UX, ",
        },
      ],
      price: "Free",
      path: "https://supercreative.design/1000-inspiring-websites",
    },
    {
      id: "130jm",
      title: "Aceternity UI",
      description:
        "Copy paste the most trending components and use them in your websites without having to worry about styling and animations.",
      tags: [
        {
          tag: "Components",
        },
        {
          tag: "UI/UX, ",
        },
      ],
      price: "Free",
      path: "https://ui.aceternity.com/",
    },
    {
      id: "131jm",
      title: "AI Skeletons",
      description: "AI generated skeletons based on your components",
      tags: [
        {
          tag: "AI Components",
        },
      ],
      price: "$25",
      path: "https://gpt-skeleton.vercel.app/",
    },
  ];

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
        <h1 className='text-3xl font-bold tracking-tight'>
          Welcome to Resources 🫡
        </h1>
        <p className='text-gray-500 dark:text-gray-400'>
          The foundation of your next project. An open source collection of
          quality resources for developers & designers
        </p>
        <div className='grid lg:grid-cols-2 gap-6'>
          {data?.map((res: any) => (
            <Link
              key={res.id}
              className='group relative flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition sm:flex-row sm:items-center sm:gap-4'
              href={res.path}
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
                    {res.title}
                  </h3>
                  <p className='text-sm text-gray-500 line-clamp-3 dark:text-gray-400'>
                    {res.description}
                  </p>
                </span>
              </span>
              <span className='flex flex-wrap px-2 md:px-0 my-2 md:mt-2'>
                {res.tags.map((tagObj: any, j: any) => (
                  <span
                    key={j}
                    className='bg-gray-200 dark:bg-amber-600 dark:text-white text-gray-800 text-xs px-2 py-1 rounded-full mr-1'
                  >
                    {tagObj.tag}
                  </span>
                ))}

                {/* <span className='bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-1'>
                  {res.price}
                </span> */}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
