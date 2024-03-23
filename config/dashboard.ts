import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Leader Board",
      href: "/leadboard",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "AI",
      href: "/dashboard/ai",
      icon: "media",
    },
    {
      title: "Accessibility",
      href: "/dashboard/accessibility",
      icon: "post",
    },
    {
      title: "Authentication",
      href: "/dashboard/authentication",
      icon: "settings",
    },
    {
      title: "Background",
      href: "/dashboard/background",
      icon: "help",
    },
    {
      title: "Boilerplate",
      href: "/dashboard/boilerplate",
      icon: "pizza",
    },
  ],
};
