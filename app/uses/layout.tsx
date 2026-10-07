import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses | Nux Gajurel — Tools & Setup",
  description:
    "Tools, software, hardware and setup used by Nawaraj Gajurel (Nux Gajurel), the best Full-Stack Developer & Freelancer from Biratchowk, Morang, Nepal. Developer gear and tech stack.",
  keywords: [
    "Nux Gajurel uses",
    "Nawaraj Gajurel tools",
    "developer setup Nepal",
    "Nux Gajurel setup",
    "developer tools Biratchowk",
    "Nux Gajurel tech stack",
    "developer gear Nepal",
  ],
  alternates: {
    canonical: "https://nuxgajurel.com/uses",
  },
  openGraph: {
    title: "Uses | Nux Gajurel — Tools & Developer Setup",
    description:
      "Tools, hardware and software used by Nawaraj Gajurel (Nux Gajurel), best developer from Biratchowk, Nepal.",
    url: "https://nuxgajurel.com/uses",
    images: [{ url: "/Nuxgajurel.jpg", width: 1200, height: 630, alt: "Nux Gajurel Uses & Setup" }],
  },
};

export default function UsesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
