"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { onBoardingAuth } from "@/schema/schema";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { getCurrentUser } from "@/lib/authProvider";
import { updateUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import ImageInput from "@/components/image-input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof onBoardingAuth> & { name: string };

export default function ({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(onBoardingAuth),
    defaultValues: {
      image: "",
      name: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const newData = { ...data, image: imageUrl };
      const user: any = await getCurrentUser();
      const userId = user?.id;

      const res = await updateUser(userId, newData);

      toast({
        title: "Changes Saved 🎉",
        description:
          "We made your profile now look better. Let's take you to the dashboard",
      });

      if (res) {
        reset();
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      reset();
      setIsLoading(false);
      console.log(`Failure to make changes, ${error}`);
    }
  }

  return (
    <section className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[400px] min-h-screen'>
      <h2 className='text-2xl font-black'>
        Your account hasn’t been confirmed yet.⚠️
      </h2>
      <span className=''>
        Tell us about yourself so we can customize your account
      </span>

      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <ImageInput
              label='Profile Picture'
              endpoint='profilePicture'
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
            />

            <div className='grid items-center gap-2'>
              <Label className='' htmlFor='name'>
                Enter your name:
              </Label>
              <Input
                id='name'
                placeholder='John Doe'
                type='text'
                autoCapitalize='on'
                autoComplete='off'
                autoCorrect='off'
                disabled={isLoading}
                {...register("name")}
              />
              {errors?.name && (
                <p className='px-1 text-xs text-red-600'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <button className={cn(buttonVariants())} disabled={isLoading}>
              {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
