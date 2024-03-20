"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

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
  Ellipsis,
  CopyIcon,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DeleteConfirmation } from "@/schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { deleteCategory } from "@/actions/resources";

// Creating a mapping of icon names to their corresponding components
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
  const [loading, setLoading] = useState<boolean>(false);
  const isAdmin = user?.role === "ADMIN";
  const router = useRouter();
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  const form = useForm<z.infer<typeof DeleteConfirmation>>({
    resolver: zodResolver(DeleteConfirmation),
    defaultValues: {
      confirmation: "",
    },
  });

  const handleDeleteAndSubmit = (categoryId: any) => {
    form.handleSubmit((data) => onSubmit(data, categoryId))();
  };

  async function onSubmit(
    data: z.infer<typeof DeleteConfirmation>,
    categoryId: any
  ) {
    setLoading(true);
    const role = user?.role;

    if (role !== "ADMIN") {
      toast({
        title: "Error",
        description: "You are not authorized to delete categories.",
      });
      return; // Exit early if user is not authorized
    }

    if (data.confirmation.trim() === "DELETE") {
      await deleteCategory(categoryId);
      setLoading(false);
      toast({
        title: "Category deleted successfully",
      });
      location.reload();
    } else {
      setLoading(false);
      toast({
        title: "Error",
        description: `Please enter the word 'DELETE' to confirm deletion.`,
      });
    }
    setLoading(false);
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
      <ScrollArea className='h-[80%] pr-4 w-[16rem]'>
        <nav className='grid items-start gap-2'>
          {items.map((item: any, index: any) => {
            const Icon = iconComponents[item.icon || "arrowRight"];
            const slug = item.name.toLowerCase().replace(/[\s/()]+/g, "-");
            return (
              <Link key={index} href={`/dashboard/${slug}`}>
                <span
                  className={cn(
                    "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground relative",
                    path === `/dashboard/${slug}`
                      ? "bg-accent bg-gradient-to-r from-transparent to-accent"
                      : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <span className='flex items-center'>
                    <Icon className='mr-2 h-4 w-4' />
                    <span>{item.name}</span>
                  </span>
                  <Form {...form}>
                    {isAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type='button'
                            className='absolutek z-10k right-0k ml-4 opacity-85k hover:opacity-100 bg-gradient-to-l dark:from-slate-800 from-slate-400 to-transparent px-2 py-2 rounded text-white cursor-pointer'
                            aria-label='More'
                          >
                            <Ellipsis className='h-4 w-4' />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                          <DropdownMenuLabel>Quick Settings</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                router.push(`/dashboard/${slug}/${item.id}`);
                                // location.reload();
                              }}
                            >
                              Edit
                              <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  className='w-full !border-none !justify-between !px-2 !h-8'
                                  variant='outline'
                                >
                                  Delete
                                  <DropdownMenuShortcut>
                                    ⌘B
                                  </DropdownMenuShortcut>
                                </Button>
                              </DialogTrigger>
                              <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                              >
                                <DialogContent className='sm:max-w-md'>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Are you sure you want to delete?
                                    </DialogTitle>
                                    <DialogDescription>
                                      Type the following word &nbsp;
                                      <span className='font-black text-red-600'>
                                        DELETE
                                      </span>
                                      &nbsp;to delete the following category
                                    </DialogDescription>
                                  </DialogHeader>

                                  <FormField
                                    control={form.control}
                                    name='confirmation'
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            placeholder='type the word DELETE and press enter'
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <DialogFooter className='sm:justify-start'>
                                    <DialogClose asChild>
                                      {loading ? (
                                        <Button
                                          disabled
                                          className='w-full hover:bg-red-600'
                                          variant='secondary'
                                        >
                                          <span>
                                            <Loader className='mr-2 h-4 w-4 animate-spin' />
                                          </span>
                                          Deleting Category...
                                        </Button>
                                      ) : (
                                        <Button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDeleteAndSubmit(item.id);
                                          }}
                                          className='w-full hover:bg-red-600'
                                          variant='secondary'
                                        >
                                          Confirm
                                        </Button>
                                      )}
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </form>
                            </Dialog>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}{" "}
                  </Form>
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
