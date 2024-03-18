import { notFound } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
// import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { DashboardNav } from "@/components/dashboard/nav";
import { UserAccountNav } from "@/components/dashboard/user-account-nav";
import Announcement from "@/components/dashboard/announcement";
import { SearchCommand } from "@/components/dashboard/search-command";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  //   const user = await getCurrentUser()

  //   if (!user) {
  //     return notFound()
  //   }

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <Announcement />
        <div className='container flex h-16 items-center justify-between py-4'>
          <MainNav items={dashboardConfig.mainNav} />
          <div className='space-x-2'>
            <SearchCommand />
            <UserAccountNav
              user={{
                name: "Kisakye Moses",
                image: "",
                email: "kiskayemoses@gmail.com",
              }}
            />
          </div>
        </div>
      </header>
      <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[200px] flex-col md:flex'>
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className='flex w-full flex-1 flex-col overflow-hidden'>
          {children}
        </main>
      </div>
      <SiteFooter className='border-t' />
    </div>
  );
}
