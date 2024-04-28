import Link from "next/link";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import fetch from "node-fetch";
import { parse } from "node-html-parser";
import { cn } from "@/lib/utils";
import {
  SquareArrowOutUpRight,
  Award,
  Bomb,
  BoomBox,
  CloudSun,
  Star,
  Loader,
  BadgeAlert,
  UserRoundCheck,
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  ShoppingBasket,
  SearchCheck,
  Code,
  AudioLines,
  Speech,
  ShieldCheck,
  ShieldBan,
  WholeWord,
  Keyboard,
  MonitorSmartphone,
  Youtube,
  Rss,
  Globe,
  SquareMousePointer,
  PenLine,
  Hash,
  FolderOpen,
  TrainFront,
} from "lucide-react";

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

// Creating a mapping of icon names to their corresponding components
const iconComponents: any = {
  SquareArrowOutUpRight,
  Award,
  Bomb,
  BoomBox,
  CloudSun,
  Star,
  Loader,
  BadgeAlert,
  UserRoundCheck,
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  ShoppingBasket,
  SearchCheck,
  Code,
  AudioLines,
  Speech,
  ShieldCheck,
  ShieldBan,
  WholeWord,
  Keyboard,
  MonitorSmartphone,
  Youtube,
  Rss,
  Globe,
  SquareMousePointer,
  PenLine,
  Hash,
  FolderOpen,
  TrainFront,
};

export default function ResourcesListing({ data, categories }: any) {
  //   console.log(data);

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='grid gap-6 md:gap-8'>
        {/* sort-by */}
        

        {/* page */}
        <div className='grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-8'>
          {data?.map(async (resource: any) => {
            const ogImage = await fetchOGImage(resource.url);
            return (
              //   <Link
              //     key={resource.id}
              //     className='relative group'
              //     href={resource.url}
              //     target='_blank'
              //   >
              //     <img
              //       alt={`Resources | ${resource.description}`}
              //       className='rounded-lg w-[16rem] h-[10rem] object-cover object-center aspect-square group-hover:opacity-50 transition-opacity'
              //       height={300}
              //       src={ogImage || "/placeholder.svg"}
              //       width={300}
              //     />
              //     <div className='flex-1 py-4'>
              //       <h3 className='font-semibold flex space-x-5 items-center justify-between tracking-tight'>
              //         {resource.name}
              //         <div className='flex items-center space-x-2'>
              //           <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 font-normal opacity-100'>
              //             Free
              //           </div>
              //           <SquareArrowOutUpRight className='w-4 h-4' />
              //         </div>
              //       </h3>
              //       <small className='text-sm leading-relax text-gray-500 dark:text-gray-400 line-clamp-2'>
              //         {resource.description}
              //       </small>
              //     </div>
              //   </Link>
              <div className='relative group animate-pulse'>
                <div className='rounded-lg lg:w-[15rem] w-full h-[10rem] bg-gray-200'></div>
                <div className='flex-1 py-1'>
                  <div className='h-6 bg-gray-200 rounded lg:w-[15rem] w-full my-4'></div>
                  <div className='inline-flex items-center rounded px-2.5 py-0.5 text-xs font-normal opacity-100 h-6 bg-gray-200  w-1/2'></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ArrowUpDownIcon(props: any) {
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
      <path d='m21 16-4 4-4-4' />
      <path d='M17 20V4' />
      <path d='m3 8 4-4 4 4' />
      <path d='M7 4v16' />
    </svg>
  );
}
