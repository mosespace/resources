import Link from "next/link";
import React from "react";

export default function Announcement() {
  return (
    <div className='bg-amber-600 px-4 py-2 text-white'>
      <p className='text-center text-sm font-medium'>
        Love Resources?&nbsp;
        <Link
          target='_blank'
          href='https://mosespace.com'
          className='inline-block underline'
        >
          Check out the developer website!
        </Link>
      </p>
    </div>
  );
}
