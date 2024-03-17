import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { marketingConfig } from "@/config/marketing";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import GitHubButton from "@/components/github-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desishub Resources | crafted by @mosespace",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex min-h-screen flex-col dark:bg-slate-950 bg-white'>
            <header className='container z-40 bg-background'>
              <div className='flex h-20 items-center justify-between py-6'>
                <MainNav items={marketingConfig.mainNav} />
                <nav className='flex space-x-2 items-center'>
                  <GitHubButton />
                  <Link
                    href='/login'
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                      "px-4"
                    )}
                  >
                    Login
                  </Link>
                </nav>
              </div>
            </header>
            <main className='container flex-1'>{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
