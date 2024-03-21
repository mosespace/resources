import { getCurrentUser } from "@/lib/authProvider";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fetch from "node-fetch";
import { parse } from "node-html-parser";

// Function to fetch OG image from URL
async function fetchOGImage(url: any) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    // console.log(root);
    const ogImageElement = root.querySelector('meta[property="og:image"]');

    if (ogImageElement) {
      return ogImageElement.getAttribute("content");
    }
  } catch (error) {
    console.error("Error fetching OG image:", error);
  }
  return null;
}

export default async function Resource({ data, title }: any) {
  const user = await getCurrentUser();
  const firstName = user?.name?.split(" ")[0];

  return (
    <div className='w-full pb-12 lg:pb-8'>
      <div className='container grid items-start gap-6 px-4 lg:px-0'>
        <div className='flex items-center gap-4'></div>
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
          {data?.map(async (res: any) => {
            const ogImage = await fetchOGImage(res.url);
            return (
              <Link
                key={res.id}
                className='group relative flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition sm:flex-row sm:items-center sm:gap-4 pr-2'
                href={res.url}
                target='_blank'
              >
                <span className='absolute top-0 right-0 p-2'>
                  <ExternalLink className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition w-4 h-4' />
                </span>

                <span className='aspect-w-4 aspect-h-3 w-full sm:w-1/3'>
                  {ogImage ? (
                    <span className='aspect-w-4 aspect-h-3 w-full sm:w-1/3'>
                      <img
                        alt={`Resources Inc | ${res.description}`}
                        className='object-cover object-center'
                        height={300}
                        src={ogImage}
                        style={{
                          aspectRatio: "400/300",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        width={400}
                      />
                    </span>
                  ) : (
                    <span className='aspect-w-4 aspect-h-3 w-full sm:w-1/3'>
                      <Image
                        alt={`Resources Inc | ${res.description}`}
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
                  )}
                </span>

                <span className='flex-1 flex flex-col p-4 sm:p-0'>
                  <span className='space-y-1'>
                    <span className='font-semibold group-hover:underline'>
                      {res.name}
                    </span>
                    <span className='text-sm text-gray-500 line-clamp-3 dark:text-gray-400'>
                      {res.description}
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
