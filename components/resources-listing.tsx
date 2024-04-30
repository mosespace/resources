"use client";

import { useEffect, useState } from "react";
import { fetchOGImage } from "@/actions/images";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function ResourcesListing({ data }: any) {
  const [ogImages, setOgImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOgImages = async () => {
      try {
        const images: any = await Promise.all(
          data.map((resource: any) => fetchOGImage(resource.url))
        );
        setOgImages(images);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching OG images:", error);
        setLoading(false);
      }
    };
    fetchOgImages();
  }, [data]);

  return (
    <main className='grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-8'>
      {loading ? (
        data?.map((_: any, index: any) => (
          <div key={index} className='relative group animate-pulse'>
            <div className='rounded-lg lg:w-[15rem] w-full h-[10rem] bg-gray-200'></div>
            <div className='flex-1 py-1'>
              <div className='h-6 bg-gray-200 rounded lg:w-[15rem] w-full my-4'></div>
              <div className='inline-flex items-center rounded px-2.5 py-0.5 text-xs font-normal opacity-100 h-6 bg-gray-200  w-1/2'></div>
            </div>
          </div>
        ))
      ) : (
        <>
          {data?.map((resource: any, index: any) => {
            const ogImage = ogImages[index] || "/placeholder.svg";
            return (
              <Link
                key={resource.id}
                className='relative group'
                href={resource.url}
                target='_blank'
              >
                <img
                  alt={`Resources | ${resource.description}`}
                  // title={`${resource.description} | Resources For Software  Developers |Resources For Software  Developers `}
                  className='rounded-lg w-[16rem] h-[10rem] object-cover object-center aspect-square group-hover:opacity-50 transition-opacity'
                  src={ogImage}
                  width={300}
                  height={300}
                />
                <div className='flex-1 py-4'>
                  <h3 className='font-semibold flex space-x-5 items-center justify-between tracking-tight'>
                    {resource.name}
                    <div className='flex items-center space-x-2'>
                      <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 font-normal opacity-100'>
                        Free
                      </div>
                      <SquareArrowOutUpRight className='w-4 h-4' />
                    </div>
                  </h3>
                  <small className='text-sm leading-relax text-gray-500 dark:text-gray-400 line-clamp-2'>
                    {resource.description}
                  </small>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </main>
  );
}
