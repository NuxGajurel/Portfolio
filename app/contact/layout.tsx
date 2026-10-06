import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Nux Gajurel | Hire a Developer in Nepal",
  description:
    "Get in touch with Nawaraj Gajurel (Nux Gajurel) — Full-Stack Web Developer from Biratnagar, Morang, Nepal. Available for freelance projects and collaborations.",
  alternates: {
    canonical: "https://nuxgajurel.com/contact",
  },
  openGraph: {
    title: "Contact Nux Gajurel | Hire a Developer in Nepal",
    description:
      "Reach out to Nawaraj Gajurel (Nux Gajurel), a Full-Stack Web Developer from Biratnagar, Nepal, for freelance projects.",
    url: "https://nuxgajurel.com/contact",
    images: [{ url: "/Nuxgajurel.jpg", width: 1200, height: 630, alt: "Contact Nux Gajurel" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
