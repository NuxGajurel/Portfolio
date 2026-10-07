import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Nux Gajurel — Developer from Biratchowk Nepal",
  description:
    "Personal dashboard of Nawaraj Gajurel (Nux Gajurel), the best Full-Stack Developer & Freelancer from Biratchowk, Morang, Nepal. View stats, activity, and developer metrics.",
  keywords: [
    "Nux Gajurel dashboard",
    "Nawaraj Gajurel stats",
    "Nux Gajurel activity",
    "developer dashboard Nepal",
    "Biratchowk developer dashboard",
    "Nux Gajurel metrics",
  ],
  alternates: {
    canonical: "https://nuxgajurel.com/dashboard",
  },
  openGraph: {
    title: "Dashboard | Nux Gajurel — Developer from Biratchowk Nepal",
    description:
      "Personal dashboard of Nawaraj Gajurel (Nux Gajurel), best developer & freelancer from Biratchowk, Morang, Nepal.",
    url: "https://nuxgajurel.com/dashboard",
    images: [{ url: "/Nuxgajurel.jpg", width: 1200, height: 630, alt: "Nux Gajurel Dashboard" }],
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
