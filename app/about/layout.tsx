import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nawaraj Gajurel (Nux Gajurel) — Best Developer from Biratchowk Nepal",
  description:
    "About Nawaraj Gajurel (Nux Gajurel) — the best Full-Stack Web Developer & Freelancer from Biratchowk, Morang, Nepal. React, Next.js, Node.js specialist. Trusted by companies worldwide. Available for freelance projects.",
  keywords: [
    "About Nux Gajurel",
    "About Nawaraj Gajurel",
    "Nawaraj Gajurel Biratchowk",
    "Nux Gajurel developer biography",
    "Nux Gajurel profile",
    "Nawaraj Gajurel profile",
    "best developer Biratchowk Nepal",
    "best freelancer Biratchowk Nepal",
    "Nux Gajurel background",
    "Nawaraj Gajurel full stack developer Nepal",
    "Nux Gajurel about page",
    "who is Nux Gajurel",
    "who is Nawaraj Gajurel",
    "Nux Gajurel Nepal developer",
    "Biratchowk Nepal developer",
  ],
  alternates: {
    canonical: "https://nuxgajurel.com/about",
  },
  openGraph: {
    title: "About Nawaraj Gajurel (Nux Gajurel) | Best Developer from Biratchowk Nepal",
    description:
      "Nawaraj Gajurel (Nux Gajurel) — Best Full-Stack Developer & Freelancer from Biratchowk, Morang, Nepal. Building clean, scalable web applications.",
    url: "https://nuxgajurel.com/about",
    images: [
      {
        url: "/Nuxgajurel.jpg",
        width: 1200,
        height: 630,
        alt: "Nawaraj Gajurel (Nux Gajurel) — Web Developer from Biratchowk Nepal",
        type: "image/jpeg",
      },
      {
        url: "/about.png",
        width: 1200,
        height: 800,
        alt: "Nux Gajurel — About Page, Developer from Biratchowk Nepal",
        type: "image/png",
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
