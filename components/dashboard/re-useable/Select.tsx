import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import {
  Select,
  SelectContent,
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
  //   console.log(selectableContent);
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

              <SelectContent>
                {selectableContent.map((item: any, id: any) => (
                  <div key={id}>
                    <SelectItem value={item.id}>{item.title}</SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}
