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

export default function CustomSelect({
  control,
  name,
  label,
  placeholder,
  selectableContent,
  description,
}: any) {
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
                  {selectableContent.map((item: any, id: any) => (
                    <SelectItem value={item.id}>{item.name}</SelectItem>
                  ))}
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
