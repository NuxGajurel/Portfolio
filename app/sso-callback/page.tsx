import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
