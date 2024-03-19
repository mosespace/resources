"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
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
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

// Create a mapping of icon names to their corresponding components
const iconComponents: any = {
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
};

export function DashboardNav({ items, user }: any) {
  const isAdmin = user?.role === "ADMIN";

  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <div className='flex flex-col space-y-3'>
      <span className='font-black flex items-center justify-between'>
        All Categories
        {isAdmin && (
          <Link href='/dashboard/categories/c'>
            <Plus className='w-4 h-4 text-amber-600' />
          </Link>
        )}
      </span>
      <ScrollArea className='h-[70%] w-48k'>
        <nav className='grid items-start gap-2'>
          {items.map((item: any, index: any) => {
            const Icon = iconComponents[item.icon || "arrowRight"];
            const slug = item.name.toLowerCase().replace(/[\s/]+/g, "-");
            return (
              <Link key={index} href={`/dashboard/${slug}`}>
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === `/dashboard/${slug}` ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Icon className='mr-2 h-4 w-4' />
                  <span>{item.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
