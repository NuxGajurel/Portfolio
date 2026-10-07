import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guestbook | Nux Gajurel — Leave a Message",
  description:
    "Sign the guestbook of Nawaraj Gajurel (Nux Gajurel), the best Full-Stack Developer & Freelancer from Biratchowk, Morang, Nepal. Leave a message and connect with a top Nepal developer.",
  keywords: [
    "Nux Gajurel guestbook",
    "Nawaraj Gajurel guestbook",
    "leave message Nepal developer",
    "Nux Gajurel contact",
    "sign guestbook Nux Gajurel",
  ],
  alternates: {
    canonical: "https://nuxgajurel.com/guestbook",
  },
  openGraph: {
    title: "Guestbook | Nux Gajurel — Leave a Message",
    description:
      "Sign the guestbook of Nawaraj Gajurel (Nux Gajurel), best developer from Biratchowk, Morang, Nepal.",
    url: "https://nuxgajurel.com/guestbook",
    images: [{ url: "/Nuxgajurel.jpg", width: 1200, height: 630, alt: "Nux Gajurel Guestbook" }],
  },
};

export default function GuestbookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
