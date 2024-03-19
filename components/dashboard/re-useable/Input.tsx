import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

export default function CustomInput({
  control,
  name,
  label,
  placeholder,
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
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
