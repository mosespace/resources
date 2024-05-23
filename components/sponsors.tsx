import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Sponsors() {
  const sponsors = [
    {
      id: "1",
      path: "/",
      name: "AWS",
      img: "/next.svg",
      short_description: "Lorem hello world uganda",
    },
    {
      id: "2",
      path: "/",
      name: "Prisma",
      img: "/next.svg",
      short_description: "Lorem hello brand-rider uganda",
    },
    {
      id: "3",
      path: "/",
      name: "Vercel",
      img: "/vercel.svg",
      short_description: "Lorem hello brand-rider uganda",
    },
  ];
  return (
    <div className='pr-4 w-full'>
      <div id='recourses' className='grid gap-1'>
        <h1 className='text-2xl font-bold tracking-tight'>Our Sponsors</h1>
        <p className='text-gray-500 max-w-[650px] dark:text-gray-400'>
          This is a list of our top sponsors. You can also request to be part of
          our sponsors through writing to us on via email:{" "}
          <span className='font-bold text-primary'>desishub@email.com</span>
        </p>
      </div>

      <div className='grid mt-4 grid-cols-2 md:grid-cols-3 gap-2'>
        {sponsors.map((sponsor) => (
          <Link
            key={sponsor.id}
            href={sponsor.path}
            target='_blank'
            className='text-gray-300 hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 my-1 rounded-xl overflow-hidden relative'
          >
            <div className='flex space-x-8 items-center px-8 py-4'>
              <Image
                width={1080}
                height={1080}
                src={sponsor.img}
                alt={sponsor.name}
                className='w-12 h-12 bg-orange-500 rounded-full p-1 dark:filter dark:invert mb-2 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all'
              />
              <div className='text-gray-400'>
                <p className='font-bold'>{sponsor.name}</p>
                <p className='line-clamp-1 text-xs'>
                  {sponsor.short_description}
                </p>
              </div>
            </div>
            <div className='h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0'></div>
            <div className='h-0.5 group-hover:w-full bg-gradient-to-l via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all'></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
