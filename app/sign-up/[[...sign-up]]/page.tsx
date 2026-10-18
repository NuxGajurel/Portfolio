import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account on Nux Gajurel's portfolio.",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12 px-4">
      <SignUp />
    </div>
  );
}
