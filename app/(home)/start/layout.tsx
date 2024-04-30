import { getResources } from "@/actions/resources";
import { getCategories} from "@/actions/categories";
import { redirect } from "next/navigation";
import CategoriesSidebar from "@/components/categories-sidebar";
import HeadingSection from "@/components/heading-section";
import { getCurrentUser } from "@/lib/authProvider";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const resources = await getResources();
  const categories = await getCategories();

  const approvedResources = resources?.filter(
    (approved_resource) => approved_resource.isApproved === true
  );

  const user: any = await getCurrentUser();
  const userId = user?.id;

  if (userId) {
    redirect("/login");
  }

  if (userId)
    return (
      <section className='mt-10 flex justify-center md:mt-16 lg:mt-20'>
        <div className='md:container max-w-6xl mx-auto md:px-6 grid md:grid-cols-[240px_1fr] lg:grid-cols-[290px_1fr] gap-10 items-start py-8'>
          <div className='lg:sticky lg:top-14'>
            <CategoriesSidebar categories={categories} />
          </div>
          <div className='grid gap-6 md:gap-8'>
            <HeadingSection data={approvedResources} />
            <main className='flex w-full flex-1 flex-col overflow-hidden'>
              {children}
            </main>
          </div>
        </div>
      </section>
    );
}
