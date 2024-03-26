import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/authProvider";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  const user = await getCurrentUser();
  if (user) {
    return redirect("/leadboard");
  }
  return (
    <>
      <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
          <Link
            href={siteConfig.links.twitter}
            className='rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium'
            target='_blank'
          >
            Follow along on Twitter
          </Link>
          <h1 className='font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            A resources app built using Next.js 14 server components 🔥.
          </h1>
          <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
            I&apos;m building a resources page app with Next.js 14 and open
            sourcing everything. Follow along and we figure this out together.
          </p>
          <div className='space-x-4'>
            <Link href='/login' className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
