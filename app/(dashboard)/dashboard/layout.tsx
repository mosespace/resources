import { notFound, redirect } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { DashboardNav } from "@/components/dashboard/nav";
import { UserAccountNav } from "@/components/dashboard/user-account-nav";
import Announcement from "@/components/dashboard/announcement";
import { SearchCommand } from "@/components/dashboard/search-command";
import { getCurrentUser } from "@/lib/authProvider";
import { CrudOperations } from "@/components/dashboard/crud-operations";
import { getCategories, getResources, getUser } from "@/actions/resources";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user: any = await getCurrentUser();
  // console.log(user);
  const categories = await getCategories();

  const resources = await getResources();

  const userId = user?.id;
  const dbUser = await getUser(userId);
  const username = dbUser?.name;

  if (!user) {
    return notFound();
  }

  if (username === null) {
    return redirect("/onboarding");
  }

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <Announcement />
        <div className='container flex h-16 items-center justify-between py-4'>
          <MainNav items={dashboardConfig.mainNav} />
          <div className='flex space-x-2'>
            <div className='hidden md:flex space-x-2 items-center'>
              <SearchCommand />
              <CrudOperations
                user={user}
                initialData=''
                categories={categories}
              />
            </div>
            <UserAccountNav
              user={{
                name: user?.name,
                image: user?.image,
                email: user?.email,
                role: user?.role,
              }}
              resources={resources}
            />
          </div>
        </div>
      </header>
      <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[200px] flex-col md:flex'>
          <DashboardNav items={categories} user={user} />
        </aside>
        <main className='flex w-full flex-1 flex-col overflow-hidden'>
          {children}
        </main>
      </div>
      <SiteFooter className='border-t' />
    </div>
  );
}
