export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Astar Trading & Agro Processing Co. Ltd.",
  description:
    "ASTAR LLC, AStar Trading, AStar limited,AStar Trading & Agro Processing Co. Ltd,AStar Trading & Agro Processing Company, AStar Trading & Agro Processing Company Limited,  Africa commodity trading, agriculture trade Africa, mineral trade Africa, energy trade Africa, sustainable farming, soya beans Africa, shea butter Africa, cashew trade, palm oil trade, maize Africa, rice Africa, gold trade Africa, diamond trade Africa, tanzanite Africa, crude oil Africa, green energy Africa, solar energy Africa, wind energy Africa, hydro power Africa, investment Africa, high-growth sectors Africa, sustainable investment, trade facilitation Africa, intra-African trade, market access Africa, logistics Africa, regional trade Africa, regulatory guidance Africa, emerging markets Africa",
  telephone: "026 917 3378",
  author: {
    name: "Pius Opoku-Fofie",
    url: "https://x.com/africanpride",
  },
  year: new Date().getFullYear(),
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Partners",
      href: "/partners",
    },
    {
      label: "News",
      href: "/news",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
