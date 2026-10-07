import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos | Nux Gajurel — Developer from Biratchowk Nepal",
  description:
    "Personal photos and portfolio images of Nawaraj Gajurel (Nux Gajurel), the best Full-Stack Developer & Freelancer from Biratchowk, Morang, Nepal. View profile photos, portfolio shots, and life moments.",
  keywords: [
    "Nux Gajurel photos",
    "Nawaraj Gajurel photos",
    "Nux Gajurel profile photo",
    "Nawaraj Gajurel profile picture",
    "developer photos Biratchowk Nepal",
    "Nux Gajurel portfolio images",
    "Nux Gajurel pictures",
    "Nawaraj Gajurel pictures",
    "Nepal developer photos",
    "Biratchowk developer photo",
  ],
  alternates: {
    canonical: "https://nuxgajurel.com/photos",
  },
  openGraph: {
    title: "Photos | Nux Gajurel — Developer from Biratchowk Nepal",
    description:
      "Personal photos and portfolio images of Nawaraj Gajurel (Nux Gajurel), best developer from Biratchowk, Morang, Nepal.",
    url: "https://nuxgajurel.com/photos",
    images: [
      {
        url: "/Nuxgajurel.jpg",
        width: 1200,
        height: 630,
        alt: "Nux Gajurel — Profile Photo, Developer from Biratchowk Nepal",
        type: "image/jpeg",
      },
      {
        url: "/nux.png",
        width: 800,
        height: 800,
        alt: "Nawaraj Gajurel (Nux Gajurel) — Portfolio Photo",
        type: "image/png",
      },
    ],
  },
};

export default function PhotosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
