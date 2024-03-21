"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { updateResource } from "@/actions/resources";
import React from "react";
import { Loader } from "lucide-react";

const FormSchema = z.object({
  isApproved: z.boolean().default(false).optional(),
});

export function ApproveSwitch({ resourceId, isApproved }: any) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isApproved,
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const update = await updateResource(resourceId, data);
      if (update) {
        toast({
          title: "Resource status is now public 🎉",
        });
        setLoading(false);
        location.reload();
      }
    } catch (error: any) {
      setLoading(false);
      toast({ title: "Error might be on your network. Try again " });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex items-center space-x-4'
      >
        <FormField
          control={form.control}
          name='isApproved'
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        {loading ? (
          <Button disabled className='!px-4 !py-1 hover:bg-orange-400'>
            <span>
              <Loader className='mr-2 h-4 w-4 animate-spin' />
            </span>
            Approving...
          </Button>
        ) : (
          <Button type='submit' className='!px-4 !py-1'>
            Approve
          </Button>
        )}
      </form>
    </Form>
  );
}
