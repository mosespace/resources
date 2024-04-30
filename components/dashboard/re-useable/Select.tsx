import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
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

export default function CustomSelect({
  control,
  name,
  label,
  placeholder,
  selectableContent,
  description,
}: any) {
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
    {
      value: "Youtube",
      label: "Youtube",
      icon: <Youtube className='w-5 h-5' />,
    },
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
    {
      value: "PenLine",
      label: "PenLine",
      icon: <PenLine className='w-5 h-5' />,
    },
    { value: "Hash", label: "Hash", icon: <Hash className='w-5 h-5' /> },
    { value: "Code", label: "Code", icon: <Code className='w-5 h-5' /> },
    { value: "Star", label: "Star", icon: <Star className='w-5 h-5' /> },
    { value: "Award", label: "Award", icon: <Award className='w-5 h-5' /> },
    { value: "Bomb", label: "Bomb", icon: <Bomb className='w-5 h-5' /> },
    {
      value: "BoomBox",
      label: "BoomBox",
      icon: <BoomBox className='w-5 h-5' />,
    },
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

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormDescription className='text-pink-500'>
              {description}
            </FormDescription>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectGroup>
                <SelectContent>
                  {selectableContent.map((item: any, id: any) => {
                    const icon = icons.find((icon) => icon.value === item.icon);
                    return (
                      <SelectItem key={id} value={item.id} className='py-2'>
                        <span className='flex items-center gap-2'>
                          {icon && icon.icon}
                          {item.name}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </SelectGroup>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
