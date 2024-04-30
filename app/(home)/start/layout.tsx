import { Metadata } from "next";

import { getResources } from "@/actions/resources";
import { getCategories } from "@/actions/categories";
import { redirect } from "next/navigation";
import CategoriesSidebar from "@/components/categories-sidebar";
import HeadingSection from "@/components/heading-section";
import { getCurrentUser } from "@/lib/authProvider";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Complete Developer Resources.",
  description:
    "Daily Front-end Development short resources and tricks for React, TypeScript HTML, CSS, and Vanilla JavaScript, alongside essential libraries and tools. Build 10X faster with the best resources",
};

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

  if (!userId) {
    redirect("/login");
    return null; // Return early to prevent further execution
  }

  return (
    <section className='flex w-full md:max-w-6xl items-center justify-between mx-auto md:flex-1 mt-10 md:mt-16 lg:mt-20'>
      <div className='max-w-6xl mx-auto md:px-6 grid md:grid-cols-[240px_1fr] lg:grid-cols-[290px_1fr] gap-10 items-start py-8 '>
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
