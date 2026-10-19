import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Nux Gajurel's portfolio.",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12 px-4">
      <SignIn
        forceRedirectUrl="/guestbook"
        signUpForceRedirectUrl="/guestbook"
      />
    </div>
  );
}
