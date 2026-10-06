import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects by Nux Gajurel | Web Developer Nepal",
  description:
    "Explore projects built by Nawaraj Gajurel (Nux Gajurel) — a Full-Stack Web Developer from Biratnagar, Morang, Nepal. React, Next.js & Node.js projects.",
  alternates: {
    canonical: "https://nuxgajurel.com/projects",
  },
  openGraph: {
    title: "Projects | Nux Gajurel — Web Developer from Nepal",
    description:
      "Real-world web apps and projects by Nawaraj Gajurel (Nux Gajurel), Full-Stack Developer from Biratnagar, Nepal.",
    url: "https://nuxgajurel.com/projects",
    images: [{ url: "/Nuxgajurel.jpg", width: 1200, height: 630, alt: "Projects by Nux Gajurel" }],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
