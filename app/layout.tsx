import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

export const metadata: Metadata = {
  title: {
    default: "Resources | crafted by @mosespace",
    template: `%s - Resources | crafted by @mosespace`,
  },
  metadataBase: new URL(baseUrl),
  description:
    "A collection of resources for developers, designers, and creators. Find the best tools, libraries, and frameworks to build your next project. 🚀",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Resources",
    "Software Developer",
    "Reloading",
  ],
  authors: [
    {
      name: "mosespace | Kisakye Moses",
      url: "https://mosespace.com",
    },
  ],
  creator: "mosespace | Kisakye Moses",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Resources | crafted by @mosespace",
    description:
      "A collection of resources for developers, designers, and creators. Find the best tools, libraries, and frameworks to build your next project. 🚀",
    siteName: "Resources | crafted by @mosespace",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Resources | crafted by @mosespace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | crafted by @mosespace",
    description:
      "A collection of resources for developers, designers, and creators. Find the best tools, libraries, and frameworks to build your next project. 🚀",
    images: `og-image.jpg`,
    creator: "@mosespace",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${baseUrl}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
