"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { fetchOGImage } from "@/actions/resources";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function Search({ data, categories }: any) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((res: any) =>
    res.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className='flex lg:hidden items-center w-full max-w-sm space-x-2 border border-gray-300 rounded-lg px-3 py-2 text-sm'>
        <Input
          className='w-full border-0 h-8 font-semibold'
          placeholder='Search by category...'
          type='search'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className='w-4 h-4 opacity-50' />
      </div>

      <div className='grid lg:grid-cols-2 gap-6'>
        {filteredData?.map(async (res: any) => {
          // const ogImage = await fetchOGImage(res.url);
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

              {/* <span className='aspect-w-4 aspect-h-3 w-full sm:w-1/3'>
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
              </span> */}

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
    </>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
