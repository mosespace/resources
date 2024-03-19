"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { userAuthSchema } from "@/schema/schema";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema> & { name: string };

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    console.log(data);
    setIsLoading(true);

    const signInResult = await signIn("resend", {
      // name: data.name, // Include name in the signIn function call
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    });

    reset();
    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          {/* <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='name'>
              Name
            </Label>
            <Input
              id='name'
              placeholder='John Doe'
              type='text'
              autoCapitalize='on'
              autoComplete='off'
              autoCorrect='off'
              disabled={isLoading || isGitHubLoading}
              {...register("name")}
            />
            {errors?.name && (
              <p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
            )}
          </div> */}
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className='px-1 text-xs text-red-600'>
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
            Sign In credentials
          </button>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      <button
        type='button'
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true);
          signIn("github");
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Loader className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Icons.gitHub className='mr-2 h-4 w-4' />
        )}{" "}
        Github
      </button>
    </div>
  );
}
