"use client";
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
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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

export default function CategoriesSidebar({ categories }: any) {
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 8);

  const path = usePathname();
  const router = useRouter();
  return (
    <div className='flex flex-col gap-4'>
      <Accordion className='w-full' collapsible type='single'>
        <AccordionItem value='time-of-day'>
          <AccordionTrigger className='text-base font-semibold'>
            Last Updated
          </AccordionTrigger>
          <AccordionContent>
            <div className='grid gap-2'>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox id='time-morning' />
                One(1) week back
                {"\n                            "}
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox id='time-afternoon' />
                One(1) month back
                {"\n                            "}
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox id='time-evening' />
                Two(2) months back
                {"\n                            "}
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='duration'>
          <AccordionTrigger className='text-base font-semibold'>
            Orther
          </AccordionTrigger>
          <AccordionContent>
            <div className='grid gap-2'>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox id='duration-up-to-1-hour' />
                Most viewed{"\n                            "}
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox id='duration-1-to-4-hours' />1 to 4 hours
                {"\n                            "}
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox id='duration-4-hours-to-1-day' />4 hours to 1 day
                {"\n                            "}
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox id='duration-1-to-3-days' />1 to 3 days
                {"\n                            "}
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* categories */}
      <div className='grid gap-1'>
        <h3 className='font-semibold flex justify-between items-center'>
          All Categories
          <button onClick={() => router.push("/start")}>
            <RefreshCw className='w-4 h-4' />
          </button>
        </h3>
        {visibleCategories.map((item: any, index: any) => {
          const Icon = iconComponents[item.icon];
          return (
            <Link key={index} href={`/start/c/${item?.slug}`}>
              <span
                className={cn(
                  "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground relative",
                  path === `/start/c/${item?.slug}`
                    ? "bg-accent bg-gradient-to-r from-transparent to-accent"
                    : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <span className='flex items-center'>
                  <Icon className='mr-2 h-4 w-4' />
                  <span>{item.name}</span>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
      <Button
        className='justify-self-start'
        variant='outline'
        onClick={() => setShowAllCategories(!showAllCategories)}
      >
        {showAllCategories ? "Show less" : "Show more"}
      </Button>
    </div>
  );
}
