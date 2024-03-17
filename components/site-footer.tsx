import * as React from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          {/* <Icons.logo /> */}
          <img src='/logo.svg' alt='' className='w-5 h-5' />

          <p className='text-center text-sm leading-loose md:text-left'>
            Built by&nbsp;
            <Link
              href={siteConfig.links.twitter}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              @mosespace
            </Link>
            . Hosted on&nbsp;
            <Link
              href='https://vercel.com'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              Vercel
            </Link>
            . Illustrations by&nbsp;
            <Link
              href='https://www.desishub.com'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              Desishub
            </Link>
            . The source code is available on&nbsp;
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
