import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Nux Gajurel — Developer from Biratchowk Nepal",
  description:
    "Tech articles, tutorials and developer insights by Nawaraj Gajurel (Nux Gajurel), the best Full-Stack Developer & Freelancer from Biratchowk, Morang, Nepal. React, Next.js, Node.js and web development blog posts.",
  keywords: [
    "Nux Gajurel blog",
    "Nawaraj Gajurel blog",
    "Nepal developer blog",
    "Biratchowk developer blog",
    "React Next.js tutorials Nepal",
    "web development blog Nepal",
    "Nux Gajurel articles",
    "full stack developer blog Nepal",
  ],
  alternates: {
    canonical: "https://nuxgajurel.com/blogs",
  },
  openGraph: {
    title: "Blogs | Nux Gajurel — Developer from Biratchowk Nepal",
    description:
      "Tech articles and developer insights by Nawaraj Gajurel (Nux Gajurel), best developer from Biratchowk Nepal. React, Next.js, Node.js topics.",
    url: "https://nuxgajurel.com/blogs",
    images: [{ url: "/Nuxgajurel.jpg", width: 1200, height: 630, alt: "Nux Gajurel Blog" }],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
