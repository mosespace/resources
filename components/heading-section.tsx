import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";

export default function HeadingSection({ data }: any) {
  return (
    <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8'>
      <div id='recourses' className='grid gap-1'>
        <h1 className='text-2xl font-bold tracking-tight'>
          All resources packed for you ({data?.length})
        </h1>
        <p className='text-gray-500 dark:text-gray-400'>
          Don’t crack under pressure. Double your pleasure, speed up your
          development.
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='ml-auto shrink-0' variant='outline'>
            <ArrowUpDownIcon className='w-4 h-4 mr-2' />
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuRadioGroup value='featured'>
            <DropdownMenuRadioItem value='featured'>
              Featured
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='Newest'>Newest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='low'>
              Price: Low to High
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='high'>
              Price: High to Low
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
