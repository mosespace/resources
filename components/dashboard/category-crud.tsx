"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
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
  TrainFront,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";
import { postCategory, updateCategory } from "@/actions/resources";
import { generateSlug } from "@/lib/generateSlug";

const icons = [
  {
    value: "ShoppingBasket",
    label: "ShoppingBasket",
    icon: <ShoppingBasket className='w-5 h-5' />,
  },
  {
    value: "ShoppingBasket",
    label: "ShoppingBasket",
    icon: <ChevronLeft className='w-5 h-5' />,
  },

  {
    value: "ShoppingBasket",
    label: "ShoppingBasket",
    icon: <ChevronRight className='w-5 h-5' />,
  },
  {
    value: "ShoppingBasket",
    label: "ShoppingBasket",
    icon: <TrainFront className='w-5 h-5' />,
  },
  {
    value: "SearchCheck",
    label: "SearchCheck",
    icon: <SearchCheck className='w-5 h-5' />,
  },
  {
    value: "AudioLines",
    label: "AudioLines",
    icon: <AudioLines className='w-5 h-5' />,
  },
  { value: "Speech", label: "Speech", icon: <Speech className='w-5 h-5' /> },
  {
    value: "ShieldCheck",
    label: "ShieldCheck",
    icon: <ShieldCheck className='w-5 h-5' />,
  },
  {
    value: "WholeWord",
    label: "WholeWord",
    icon: <WholeWord className='w-5 h-5' />,
  },
  {
    value: "Keyboard",
    label: "Keyboard",
    icon: <Keyboard className='w-5 h-5' />,
  },
  {
    value: "MonitorSmartphone",
    label: "MonitorSmartphone",
    icon: <MonitorSmartphone className='w-5 h-5' />,
  },
  { value: "Youtube", label: "Youtube", icon: <Youtube className='w-5 h-5' /> },
  {
    value: "ShieldBan",
    label: "ShieldBan",
    icon: <ShieldBan className='w-5 h-5' />,
  },
  { value: "Rss", label: "Rss", icon: <Rss className='w-5 h-5' /> },
  { value: "Globe", label: "Globe", icon: <Globe className='w-5 h-5' /> },
  {
    value: "SquareMousePointer",
    label: "SquareMousePointer",
    icon: <SquareMousePointer className='w-5 h-5' />,
  },
  { value: "PenLine", label: "PenLine", icon: <PenLine className='w-5 h-5' /> },
  { value: "Hash", label: "Hash", icon: <Hash className='w-5 h-5' /> },
  { value: "Code", label: "Code", icon: <Code className='w-5 h-5' /> },
  { value: "Star", label: "Star", icon: <Star className='w-5 h-5' /> },
  { value: "Award", label: "Award", icon: <Award className='w-5 h-5' /> },
  { value: "Bomb", label: "Bomb", icon: <Bomb className='w-5 h-5' /> },
  { value: "BoomBox", label: "BoomBox", icon: <BoomBox className='w-5 h-5' /> },
  {
    value: "FolderOpen",
    label: "FolderOpen",
    icon: <FolderOpen className='w-5 h-5' />,
  },
  {
    value: "X",
    label: "X",
    icon: <X className='w-5 h-5' />,
  },
  {
    value: "User",
    label: "User",
    icon: <User className='w-5 h-5' />,
  },
  {
    value: "Twitter",
    label: "Twitter",
    icon: <Twitter className='w-5 h-5' />,
  },
  {
    value: "Trash",
    label: "Trash",
    icon: <Trash className='w-5 h-5' />,
  },
  {
    value: "SunMedium",
    label: "SunMedium",
    icon: <SunMedium className='w-5 h-5' />,
  },
  {
    value: "Settings",
    label: "Settings",
    icon: <Settings className='w-5 h-5' />,
  },
  {
    value: "Moon",
    label: "Moon",
    icon: <Moon className='w-5 h-5' />,
  },
  {
    value: "Plus",
    label: "Plus",
    icon: <Plus className='w-5 h-5' />,
  },
  {
    value: "Pizza",
    label: "Pizza",
    icon: <Pizza className='w-5 h-5' />,
  },
  {
    value: "MoreVertical",
    label: "MoreVertical",
    icon: <MoreVertical className='w-5 h-5' />,
  },
  {
    value: "Loader2",
    label: "Loader2",
    icon: <Loader2 className='w-5 h-5' />,
  },
  {
    value: "Laptop",
    label: "Laptop",
    icon: <Laptop className='w-5 h-5' />,
  },
  {
    value: "Image",
    label: "Image",
    icon: <Image className='w-5 h-5' />,
  },
  {
    value: "BadgeAlert",
    label: "BadgeAlert",
    icon: <BadgeAlert className='w-5 h-5' />,
  },
  {
    value: "FileText",
    label: "FileText",
    icon: <FileText className='w-5 h-5' />,
  },
  {
    value: "HelpCircle",
    label: "HelpCircle",
    icon: <HelpCircle className='w-5 h-5' />,
  },
  {
    value: "File",
    label: "File",
    icon: <File className='w-5 h-5' />,
  },
  {
    value: "CreditCard",
    label: "CreditCard",
    icon: <CreditCard className='w-5 h-5' />,
  },
  {
    value: "CloudSun",
    label: "CloudSun",
    icon: <CloudSun className='w-5 h-5' />,
  },
  {
    value: "UserRoundCheck",
    label: "UserRoundCheck",
    icon: <UserRoundCheck className='w-5 h-5' />,
  },
  {
    value: "AlertTriangle",
    label: "AlertTriangle",
    icon: <AlertTriangle className='w-5 h-5' />,
  },
  {
    value: "ArrowRight",
    label: "ArrowRight",
    icon: <ArrowRight className='w-5 h-5' />,
  },
  {
    value: "Check",
    label: "Check",
    icon: <Check className='w-5 h-5' />,
  },
  {
    value: "Command",
    label: "Command",
    icon: <Command className='w-5 h-5' />,
  },
];

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  slug: z.string(),
  icon: z.string(),
  userId: z.string(),
});

export default function CategoryCreate({ initialData, user }: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      slug: "",
      icon: "",
      userId: initialData ? initialData.userId : user?.id,
      ...initialData,
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const slug = generateSlug(data.name);
    data.slug = slug;
    data.userId = initialData ? initialData.userId : user?.id;

    try {
      if (initialData) {
        setLoading(true);
        const update = await updateCategory(initialData?.id, data, data.userId);
        if (update) {
          setLoading(false);
          toast({
            title: "Your category has been updated successfully",
          });
          location.reload();
        }
      } else {
        await postCategory(data);
        toast({
          title: "Your category has been added successfully",
        });
        setLoading(false);
        location.reload();
      }
    } catch (error: any) {
      toast({ title: "Error might be on your network. Try again " });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='w-[350px] mx-auto my-20'>
          <CardHeader>
            <CardTitle>Create category</CardTitle>
            <CardDescription>
              Create a new category in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Category name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='icon'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chose Icon' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position='popper'>
                        <SelectGroup className='grid grid-cols-4 gap-2'>
                          {icons.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              {icon.icon}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-4'>
              {loading ? (
                <Button
                  disabled
                  type='submit'
                  className='w-full hover:bg-amber-600'
                >
                  <span>
                    <Loader className='mr-2 h-4 w-4 animate-spin' />
                  </span>
                  {!initialData ? "Creating category" : "Updating category"}
                </Button>
              ) : (
                <Button type='submit' className='w-full hover:bg-amber-600'>
                  {!initialData ? "Create category" : "Update category"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
