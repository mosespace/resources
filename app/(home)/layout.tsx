import Link from "next/link";

import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import GitHubButton from "@/components/github-button";
import { getCurrentUser } from "@/lib/authProvider";
import { signOut } from "next-auth/react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className='flex min-h-screen flex-col dark:bg-slate-950 bg-white'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav items={marketingConfig.mainNav} />
          <nav className='flex space-x-2 items-center'>
            <GitHubButton />
            {!user && (
              <Link
                href='/login'
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className='container flex-1'>{children}</main>
      <SiteFooter />
    </div>
  );
}
