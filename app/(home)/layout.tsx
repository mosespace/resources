import Sponsors from "@/components/sponsors";
import { MainNav } from "@/components/main-nav";
import { getResources } from "@/actions/resources";
import { getCurrentUser } from "@/lib/authProvider";
import { marketingConfig } from "@/config/marketing";
import { getCategories } from "@/actions/categories";
import { SiteFooter } from "@/components/site-footer";
import { ModeToggle } from "@/components/mode-toggle";
import { SendFeedback } from "@/components/send-feedback";
import HeadingSection from "@/components/heading-section";
import CategoriesSidebar from "@/components/categories-sidebar";
import { UserAccountNav } from "@/components/dashboard/user-account-nav";
import { CrudOperations } from "@/components/dashboard/crud-operations";

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

      <section className='flex w-full md:max-w-6xl px-4 items-center justify-between mx-auto md:flex-1 mt-10 md:mt-16 lg:mt-20'>
        <div className='grid md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr] gap-10 items-start py-8 '>
          {/* categories-side-bar */}
          <div className='lg:sticky lg:top-14'>
            <CategoriesSidebar categories={categories} />
          </div>

          <div className='grid gap-6 md:gap-8'>
            {/* advert-button */}
            <button className='relative group cursor-pointer text-sky-50  overflow-hidden h-14 w-full rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold'>
              <div className='absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900'></div>
              <div className='absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800'></div>
              <div className='absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700'></div>
              <div className='absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600'></div>
              <p className='z-10'>
                Desishub Docs |{" "}
                <span className='font-normal'>
                  {" "}
                  All in One Developer's Handbook
                </span>
              </p>
            </button>

            <div>
              <Sponsors />
            </div>

            <main className='flex w-full mx-auto flex-1 flex-col overflow-hidden'>
              {children}
            </main>
          </div>
        </div>
      </section>

      <SendFeedback user={user} />
      <SiteFooter />
    </div>
  );
}
