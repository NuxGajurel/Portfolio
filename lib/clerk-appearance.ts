import type { ClerkProvider } from "@clerk/nextjs";

type Appearance = React.ComponentProps<typeof ClerkProvider>["appearance"];

/**
 * Custom appearance configuration for Clerk components.
 * Matches the clean, minimal, monochrome aesthetic of nuxgajurel.com.
 * Supports both light and dark themes using Tailwind CSS and CSS variables.
 */
export const clerkAppearance: Appearance = {
  cssLayerName: "clerk",
  options: {
    socialButtonsVariant: "blockButton",
    socialButtonsPlacement: "top",
    logoPlacement: "none",
    showOptionalFields: false,
  },
  variables: {
    colorPrimary: "var(--clerk-color-primary, #171717)",
    colorPrimaryForeground: "#ffffff",
    colorForeground: "var(--clerk-color-foreground, #171717)",
    colorMutedForeground: "var(--clerk-color-muted-foreground, #737373)",
    colorBackground: "var(--clerk-color-background, #ffffff)",
    colorInput: "var(--clerk-color-input-background, #ffffff)",
    colorInputForeground: "var(--clerk-color-input-text, #171717)",
    colorBorder: "var(--clerk-color-border, #e5e5e5)",
    colorNeutral: "#171717",
    borderRadius: "0.75rem",
    fontFamily:
      "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: "0.875rem",
  },
  elements: {
    modalBackdrop:
      "backdrop-blur-sm bg-neutral-950/40 transition-all",
    modalContent:
      "p-0 border-none bg-transparent shadow-none max-w-md w-full mx-auto",
    cardBox:
      "rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-2xl transition-colors max-w-md w-full mx-auto overflow-hidden",
    card:
      "bg-transparent shadow-none p-6 sm:p-8",
    headerTitle:
      "text-xl sm:text-2xl font-serif tracking-tight text-neutral-900 dark:text-neutral-100",
    headerSubtitle:
      "text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1",
    socialButtonsBlockButton:
      "flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 border border-neutral-200/90 dark:border-neutral-700/80 font-medium text-sm transition-all shadow-xs cursor-pointer active:scale-[0.99]",
    socialButtonsBlockButtonText:
      "text-sm font-medium text-neutral-800 dark:text-neutral-200",
    socialButtonsProviderIcon:
      "w-4 h-4",
    dividerRow:
      "my-4",
    dividerLine:
      "bg-neutral-200 dark:bg-neutral-800",
    dividerText:
      "text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-mono",
    formFieldLabel:
      "text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1",
    formFieldInput:
      "w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition",
    formFieldErrorText:
      "text-xs text-red-500 dark:text-red-400 mt-1",
    formButtonPrimary:
      "w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition-all shadow-xs cursor-pointer active:scale-[0.99]",
    formButtonReset:
      "text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200",
    footer:
      "bg-neutral-50/70 dark:bg-neutral-900/60 border-t border-neutral-100 dark:border-neutral-800/80 py-3.5 px-6 rounded-b-2xl",
    footerActionText:
      "text-xs text-neutral-500 dark:text-neutral-400",
    footerActionLink:
      "text-xs font-medium text-neutral-900 dark:text-neutral-100 hover:underline cursor-pointer",
    footerPagesLink:
      "text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors",
    identityPreviewText:
      "text-sm font-medium text-neutral-900 dark:text-neutral-100",
    identityPreviewEditButton:
      "text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
    userButtonPopoverCard:
      "rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-xl",
    userButtonPopoverActionButton:
      "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 transition-colors",
    userButtonPopoverActionButtonText:
      "text-sm font-medium text-neutral-700 dark:text-neutral-300",
    userButtonPopoverFooter:
      "border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50",
  },
};
