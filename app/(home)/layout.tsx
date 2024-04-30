import { marketingConfig } from "@/config/marketing";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { getCurrentUser } from "@/lib/authProvider";
import { ModeToggle } from "@/components/mode-toggle";
import { SendFeedback } from "@/components/send-feedback";
import { UserAccountNav } from "@/components/dashboard/user-account-nav";
import { getResources } from "@/actions/resources";
import { CrudOperations } from "@/components/dashboard/crud-operations";
import { getCategories } from "@/actions/categories";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user: any = await getCurrentUser();
  const resources = await getResources();
  const categories = await getCategories();

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='fixed bg-foreground/1 backdrop-blur-md inset-x-0 top-0 py-4 z-50'>
        <div className='flex w-full md:max-w-6xl items-center justify-between px-4 mx-auto'>
          <div>
            <MainNav items={marketingConfig.mainNav} />
          </div>
          <nav className='flex space-x-2 items-center'>
            <div className='hidden md:block'>
              <ModeToggle />
            </div>
            <CrudOperations
              user={user}
              initialData=''
              categories={categories}
            />
            {user && (
              <UserAccountNav
                user={{
                  name: user?.name,
                  image: user?.image,
                  email: user?.email,
                  role: user?.role,
                }}
                resources={resources}
              />
            )}
          </nav>
        </div>
      </header>

      <main className='md:container w-full md:max-w-6xl items-center justify-between mx-auto md:flex-1 lg:flex'>
        {children}
      </main>
      <SendFeedback user={user} />
      <SiteFooter />
    </div>
  );
}
