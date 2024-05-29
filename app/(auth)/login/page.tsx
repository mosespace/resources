import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import { getCurrentUser } from "@/lib/authProvider";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Log-In | Resource Inc",
  description: "Log into your account to get started.",
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  // console.log(user);
  if (user) {
    return redirect("/");
  }
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className='mr-2 h-4 w-4' />
          Back
        </>
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <img src='/logo.svg' alt='' className='mx-auto w-5 h-5' />

          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome back
          </h1>
          <p className='text-sm text-muted-foreground'>
            add your credentials or use github
          </p>
        </div>
        <Suspense fallback={<></>}>
          <UserAuthForm />
        </Suspense>
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link
            href='/register'
            className='hover:text-brand underline underline-offset-4'
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
