// Admin authorization configuration and helpers for the portfolio
const rawAdminEmails =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
  process.env.ADMIN_EMAIL ||
  "";

export const ADMIN_EMAILS: string[] = rawAdminEmails
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);



/**
 * Checks if a given email string belongs to an administrator.
 */
export function isEmailAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

/**
 * Checks if a Clerk user object (client or server) belongs to an administrator.
 */
export function isClerkUserAdmin(
  user:
    | {
        emailAddresses?: Array<{ emailAddress: string }>;
        primaryEmailAddress?: { emailAddress: string } | null;
        primaryEmailAddressId?: string | null;
        id?: string;
      }
    | null
    | undefined
): boolean {
  if (!user) return false;

  if (
    user.primaryEmailAddress &&
    isEmailAdmin(user.primaryEmailAddress.emailAddress)
  ) {
    return true;
  }

  if (user.emailAddresses && Array.isArray(user.emailAddresses)) {
    return user.emailAddresses.some((e) => isEmailAdmin(e.emailAddress));
  }

  return false;
}
