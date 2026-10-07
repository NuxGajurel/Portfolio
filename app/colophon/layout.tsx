import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon | Nux Gajurel — How This Site is Built",
  description:
    "About how nuxgajurel.com is built — technologies, tools and design choices by Nawaraj Gajurel (Nux Gajurel), best Full-Stack Developer from Biratchowk, Morang, Nepal.",
  keywords: [
    "Nux Gajurel colophon",
    "Nawaraj Gajurel portfolio tech stack",
    "how nuxgajurel.com is built",
    "Next.js portfolio Nepal",
    "Nux Gajurel website tech",
  ],
  alternates: {
    canonical: "https://nuxgajurel.com/colophon",
  },
  openGraph: {
    title: "Colophon | Nux Gajurel — How This Site is Built",
    description:
      "Technologies and design choices behind nuxgajurel.com by Nawaraj Gajurel (Nux Gajurel), best developer from Biratchowk, Nepal.",
    url: "https://nuxgajurel.com/colophon",
    images: [{ url: "/Nuxgajurel.jpg", width: 1200, height: 630, alt: "Nux Gajurel Colophon" }],
  },
};

export default function ColophonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
