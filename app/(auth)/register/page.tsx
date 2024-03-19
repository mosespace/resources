import Link from "next/link";
import { Suspense } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import Image from "next/image";
import { getCurrentUser } from "@/lib/authProvider";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create an account | Resource Inc",
  description: "Create an account to get started.",
};

export default async function RegisterPage() {
  const user = await getCurrentUser();
  // console.log(user);
  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className='container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/login'
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className='hidden h-full bg-muted lg:block lg:relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-t from-slate-950  to-transparent opacity-90'></div>
        <Image
          width={1600}
          height={2000}
          src='/register-bg.jpg'
          alt='/resources | register image of creator: @mosespace'
          className='object-cover w-full h-full opacity-60k'
        />
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <img src='/logo.svg' alt='' className='mx-auto w-5 h-5' />

            <h1 className='text-2xl font-semibold tracking-tight'>
              Create an account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to create your account
            </p>
          </div>
          <Suspense fallback={<div></div>}>
            <UserAuthForm />
          </Suspense>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking continue, you agree to our&nbsp;
            <Link
              href='/terms'
              className='hover:text-brand underline underline-offset-4'
            >
              Terms of Service&nbsp;
            </Link>
            and&nbsp;
            <Link
              href='/privacy'
              className='hover:text-brand underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
