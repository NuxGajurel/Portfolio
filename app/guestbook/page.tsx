import type { Metadata } from "next";
import GuestbookClient from "./guestbook-client";

export const metadata: Metadata = {
  title: "Guestbook | Nux Gajurel",
  description:
    "Leave a comment, feedback, appreciation, or wisdom on my portfolio guestbook.",
};

export default function GuestbookPage() {
  return (
    <main className="min-h-screen">
      <GuestbookClient />
    </main>
  );
}
