import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Nux Gajurel — Developer from Biratchowk Nepal",
  description:
    "Features and capabilities of Nawaraj Gajurel (Nux Gajurel), the best Full-Stack Developer & Freelancer from Biratchowk, Morang, Nepal. Explore skills, expertise and services.",
  keywords: [
    "Nux Gajurel features",
    "Nawaraj Gajurel skills",
    "developer features Nepal",
    "Nux Gajurel services",
    "full stack developer features Biratchowk",
    "web developer skills Nepal",
  ],
  alternates: {
    canonical: "https://nuxgajurel.com/features",
  },
  openGraph: {
    title: "Features | Nux Gajurel — Developer from Biratchowk Nepal",
    description:
      "Features and services of Nawaraj Gajurel (Nux Gajurel), best developer from Biratchowk, Morang, Nepal.",
    url: "https://nuxgajurel.com/features",
    images: [{ url: "/Nuxgajurel.jpg", width: 1200, height: 630, alt: "Nux Gajurel Features" }],
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
