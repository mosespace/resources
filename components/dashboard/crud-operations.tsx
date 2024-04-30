"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { FormSchema } from "@/schema/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CustomInput from "./re-useable/Input";
import CustomSelect from "./re-useable/Select";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postResource, updateResource } from "@/actions/resources";
import { Loader, Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/authProvider";
import { generateSlug } from "@/lib/generateSlug";



export function CrudOperations({ user, initialData, categories }: any) {
  // console.log(categories);
  const userId = user?.id;
  const router = useRouter();

  function handleCreate() {
    if (!userId) {
      toast({
        title: "You need to be logged in to add a resource.",
      });
      router.push("/login");
      return null;
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      category: "",
      userId: user?.id,
      slug: "",
    },
  });

  const selectableContent = categories;

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const slug = generateSlug(data.name);
    const updatedData = { ...data, slug };
    data.userId = initialData ? initialData.userId : user?.id;

    try {
      if (initialData) {
        setLoading(false);
        const update = await updateResource(initialData?.id, updatedData);
        if (update) {
          setLoading(false);
          toast({
            title: "Your resource has been updated successfully",
          });
          location.reload();
        }
      } else {
        await postResource(updatedData);
        toast({
          title: "Your request has been added captured",
        });
        setLoading(false);
        location.reload();
      }
    } catch (error: any) {
      if (error.message === "Unauthorized update attempt") {
        toast({
          title: "Error: You are not authorized to update this task",
        });
        setLoading(false);
      } else {
        toast({ title: "Error might be on your network. Try again " });
      }
    }
  }

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData]);

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => handleCreate()}>
            <Plus className='mr-2 h-4 w-4' /> Add Resource
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[450px]'>
          <DialogHeader>
            <DialogTitle>
              {!initialData ? `Request a resource` : `Update resource`}
            </DialogTitle>
            <DialogDescription>
              {!initialData
                ? `Request a resource to be added to the collection. We'll review it and add it if it meets our standards.`
                : `Make changes to your task here. Click save when you're done. `}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className='h-[550px] px-4'>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <div className='grid gap-4 pt-4'>
                {!initialData && (
                  <>
                    <CustomInput
                      control={form.control}
                      name='name'
                      label='Name'
                      autoCapitalize='true'
                      placeholder='eg; resources'
                    />

                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormDescription>
                            Describe the resource in 2-3 sentences
                          </FormDescription>
                          <FormControl>
                            <Textarea
                              placeholder='Resources is the foundation of your next project. An open source collection of quality resource for developers & designers'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CustomInput
                      control={form.control}
                      name='url'
                      type='url'
                      label='URL'
                      placeholder='https://resources.mosepace.com'
                    />
                  </>
                )}

                <CustomSelect
                  control={form.control}
                  label='Choose category'
                  name='category'
                  placeholder='Select a category'
                  selectableContent={selectableContent}
                  description='This filed is compulsory'
                />
              </div>

              <div className=''>
                {loading ? (
                  <Button
                    disabled
                    type='submit'
                    className='w-full hover:bg-orange-400'
                  >
                    <span>
                      <Loader className='mr-2 h-4 w-4 animate-spin' />
                    </span>
                    {initialData ? "Updating" : "Creating"}
                  </Button>
                ) : (
                  <Button type='submit' className='w-full hover:bg-orange-400'>
                    {initialData ? "Update" : "Create"}
                  </Button>
                )}
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
