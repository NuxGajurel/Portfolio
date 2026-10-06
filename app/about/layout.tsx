import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nawaraj Gajurel (Nux Gajurel)",
  description:
    "Learn about Nawaraj Gajurel (Nux Gajurel) — a Full-Stack Web Developer from Biratnagar, Morang, Nepal. React, Next.js, Node.js specialist.",
  alternates: {
    canonical: "https://nuxgajurel.com/about",
  },
  openGraph: {
    title: "About Nawaraj Gajurel | Nux Gajurel — Developer from Nepal",
    description:
      "Nawaraj Gajurel (Nux Gajurel) — Full-Stack Developer from Biratnagar, Morang, Nepal. Building clean, scalable web applications.",
    url: "https://nuxgajurel.com/about",
    images: [
      {
        url: "/Nuxgajurel.jpg",
        width: 1200,
        height: 630,
        alt: "Nawaraj Gajurel (Nux Gajurel) — Web Developer Nepal",
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
