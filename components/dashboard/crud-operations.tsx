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
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postResource, updateResource } from "@/actions/resources";
import { Loader, Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/authProvider";

export function CrudOperations({ user, initialData }: any) {
  // console.log("initialData.completed:", initialData?.completed);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      in_progress: initialData?.canceled ?? false, // Set in_progress to false
      canceled: initialData?.canceled ?? false,
      todo: initialData?.todo ?? false,
      completed: initialData?.completed ?? false,
      title: "",
      tech_stack: "",
      priority: "",
      status: "",
      userId: user?.id,
    },
  });

  const selectableContent = [
    {
      id: "html css",
      title: "Html CSS",
    },
    {
      id: "react",
      title: "React",
    },
    {
      id: "vue js",
      title: "Vue Js",
    },
    {
      id: "python",
      title: "Python",
    },
  ];
  const priorityLevels = [
    {
      id: "easy",
      title: "Easy",
    },
    {
      id: "medium",
      title: "Medium",
    },
    {
      id: "hard",
      title: "Hard",
    },
    {
      id: "difficult",
      title: "Difficult",
    },
  ];

  const [inProgress, setInProgress] = useState(
    initialData?.in_progress ?? false
  );
  const [canceled, setCanceled] = useState(initialData?.canceled ?? false);
  const [todo, setTodo] = useState(initialData?.todo ?? false);
  const [completed, setCompleted] = useState(initialData?.completed ?? false);
  const [switchesDisabled, setSwitchesDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSwitchChange = (fieldName: string, newValue: boolean) => {
    // Update the switch value
    switch (fieldName) {
      case "in_progress":
        setInProgress(newValue);
        break;
      case "canceled":
        setCanceled(newValue);
        break;
      case "todo":
        setTodo(newValue);
        break;
      case "completed":
        setCompleted(newValue);
        break;
      default:
        break;
    }

    // Disable other switches if the current one is turned on
    if (newValue) {
      setSwitchesDisabled(true);
    } else {
      // Enable other switches if the current one is turned off
      setSwitchesDisabled(false);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // let status: string;
    setLoading(true);
    // Update form data with the latest switch values
    data.in_progress = inProgress;
    data.canceled = canceled;
    data.todo = todo;
    data.completed = completed;

    // Determine the status based on the latest switch values
    let status: string | undefined;

    if (status) {
      data.status = status;
    }

    data.userId = initialData ? initialData.userId : user?.id;

    // console.log(data);
    const sessionUser = await getCurrentUser();
    const userId = (sessionUser as { id: string }).id;
    try {
      if (initialData) {
        // console.log(data);
        setLoading(false);
        const update = await updateResource(initialData?.id, data, userId);
        if (update) {
          setLoading(false);
          toast({
            title: "Your task has been updated successfully",
          });
          location.reload();
        }
      } else {
        await postResource(data);
        toast({
          title: "Your task has been added successfully",
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

  const router = useRouter();
  const handelDialogView = () => {
    if (!user) {
      router.push("/login");
      return null;
    }
  };

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData]);

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
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
              <div className='grid gap-4 py-4'>
                {!initialData && (
                  <>
                    <CustomInput
                      control={form.control}
                      name='name'
                      label='Name'
                      autoCapitalize='true'
                      placeholder='eg; resources'
                    />

                    <CustomInput
                      control={form.control}
                      name='description'
                      type='textarea'
                      label='Description'
                      placeholder='Resources is the foundation of your next project. An open source collection of quality resource for developers & designers'
                    />
                    <div className='grid w-full gap-1.5'>
                      <Label htmlFor='description'>Your Message</Label>
                      <p className='text-sm text-muted-foreground'>
                        Describe the resource in 2-3 sentences
                      </p>
                      <Textarea
                        placeholder='Resources is the foundation of your next project. An open source collection of quality resource for developers & designers'
                        id='description'
                      />
                    </div>
                    <CustomInput
                      control={form.control}
                      name='url'
                      type='url'
                      label='URL'
                      placeholder='https://resources.mosepace.com'
                    />
                  </>
                )}

                {!initialData && (
                  <>
                    <CustomSelect
                      control={form.control}
                      label='Choose the tech-stack'
                      name='tech_stack'
                      placeholder='Select tech stacks'
                      selectableContent={selectableContent}
                      description='The filed wont be editable on the edit. chose wisely'
                    />

                    <CustomSelect
                      control={form.control}
                      label='Choose priority level'
                      name='priority'
                      placeholder='Select priority'
                      selectableContent={priorityLevels}
                      description='The filed wont be editable on the edit. chose wisely'
                    />
                  </>
                )}
              </div>

              <div>
                {initialData ? (
                  <>
                    <h3 className='mb-4 text-lg font-medium'>
                      Current progress&nbsp;
                      <span className='text-green-500'>
                        {initialData.status}
                      </span>
                    </h3>
                  </>
                ) : (
                  <>
                    <h3 className='mb-4 text-lg font-medium'>
                      Choose your current process
                    </h3>
                  </>
                )}

                {/* priorities */}
                {/* <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='in_progress'
                    render={({ field }: any) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <div className='space-y-0.5'>
                          <FormLabel>In Progress</FormLabel>
                          <FormDescription>
                            If task is in Progress, others will be notified
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            style={{
                              backgroundColor: inProgress ? "red" : "",
                            }}
                            disabled={switchesDisabled && !inProgress}
                            checked={inProgress}
                            onCheckedChange={(value: any) =>
                              handleSwitchChange("in_progress", value)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='canceled'
                    render={({ field }: any) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <div className='space-y-0.5'>
                          <FormLabel>Canceled</FormLabel>
                          <FormDescription>
                            If task is canceled, others will be notified
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            style={{
                              backgroundColor: canceled ? "purple" : "",
                            }}
                            disabled={switchesDisabled && !canceled}
                            checked={canceled}
                            onCheckedChange={(value: any) =>
                              handleSwitchChange("canceled", value)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='todo'
                    render={({ field }: any) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <div className='space-y-0.5'>
                          <FormLabel>To do</FormLabel>
                          <FormDescription>
                            If task is in todo mode, others will be notified
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            style={{
                              backgroundColor: todo ? "orange" : "",
                            }}
                            disabled={switchesDisabled && !todo}
                            checked={todo}
                            onCheckedChange={(value: any) =>
                              handleSwitchChange("todo", value)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='completed'
                    render={({ field }: any) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <div className='space-y-0.5'>
                          <FormLabel>Completed</FormLabel>
                          <FormDescription>
                            If task completed, others will be notified
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            style={{
                              backgroundColor: completed ? "green" : "",
                            }}
                            disabled={switchesDisabled && !completed}
                            checked={completed}
                            onCheckedChange={(value: any) =>
                              handleSwitchChange("completed", value)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div> */}
              </div>
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
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
