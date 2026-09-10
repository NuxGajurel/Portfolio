"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiSend, FiLoader, FiHeart, FiLogOut } from "react-icons/fi";
import { LuListFilter } from "react-icons/lu";

export interface GuestbookEntry {
  id: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  message: string;
  has_owner_heart?: boolean;
}

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return diffInMonths === 1 ? "about 1 month ago" : `${diffInMonths} months ago`;
    }
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  } catch {
    return "recently";
  }
}

// Generate consistent background color for initials avatar
function getAvatarBg(name: string): string {
  const colors = [
    "bg-[#5e24a4]",
    "bg-[#1e40af]",
    "bg-[#047857]",
    "bg-[#b45309]",
    "bg-[#be123c]",
    "bg-[#4338ca]",
    "bg-[#0f766e]",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function GuestbookClient() {
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();

  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Fetch guestbook messages
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
      }
    } catch (err) {
      console.error("Error fetching guestbook:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSignInWithGithub = () => {
    clerk.openSignIn({
      fallbackRedirectUrl: "/guestbook",
      signUpFallbackRedirectUrl: "/guestbook",
    });
  };

  const handleSignInWithGoogle = () => {
    clerk.openSignIn({
      fallbackRedirectUrl: "/guestbook",
      signUpFallbackRedirectUrl: "/guestbook",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setMessage("");
      // Add newly created entry to the list
      if (data.entry) {
        setEntries((prev) => [data.entry, ...prev]);
      } else {
        await fetchEntries();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  return (
    <div className="py-12 sm:py-16 space-y-10 max-w-2xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl sm:text-5xl font-serif text-neutral-900 dark:text-neutral-100 tracking-tight">
            Guestbook
          </h1>
          <button
            onClick={() => setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
            title={`Sort by: ${sortOrder === "newest" ? "Oldest first" : "Newest first"}`}
            className="p-2 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <LuListFilter size={20} />
          </button>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
          Leave a comment below. It could be anything – appreciation, information, wisdom, anything good or bad about me or even humor.
        </p>
      </div>

      {/* Sign the Guestbook Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-xs transition-colors">
        {!isLoaded ? (
          <div className="py-6 flex justify-center items-center text-neutral-400">
            <FiLoader className="animate-spin text-xl" />
          </div>
        ) : !isSignedIn ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Sign the Guestbook
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Log in to leave a message and join the building of this space.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Github Button */}
              <button
                onClick={handleSignInWithGithub}
                type="button"
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 border border-neutral-200/90 dark:border-neutral-700/80 font-medium text-sm transition-all shadow-xs active:scale-[0.99] cursor-pointer"
              >
                <FaGithub size={18} className="text-neutral-900 dark:text-white" />
                <span>Github</span>
              </button>

              {/* Google Button */}
              <button
                onClick={handleSignInWithGoogle}
                type="button"
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 border border-neutral-200/90 dark:border-neutral-700/80 font-medium text-sm transition-all shadow-xs active:scale-[0.99] cursor-pointer"
              >
                <FcGoogle size={18} />
                <span>Google</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-xl object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                ) : (
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-semibold ${getAvatarBg(
                      user?.fullName || "User"
                    )}`}
                  >
                    {(user?.firstName?.[0] || user?.username?.[0] || "U").toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {user?.fullName || user?.username || "Signed in visitor"}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Leave your note in the guestbook
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UserButton />
                <button
                  onClick={() => clerk.signOut()}
                  title="Sign out"
                  className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition text-xs"
                >
                  <FiLogOut size={16} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  maxLength={500}
                  rows={3}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 resize-none transition"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
              )}

              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-400">
                  {message.length}/500
                </span>
                <button
                  type="submit"
                  disabled={!message.trim() || submitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  {submitting ? (
                    <>
                      <FiLoader className="animate-spin" size={15} />
                      <span>Signing...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign</span>
                      <FiSend size={13} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Messages List */}
      <div className="space-y-6 pt-2">
        {loading && (
          <div className="flex justify-center items-center py-10 text-neutral-400">
            <FiLoader className="animate-spin text-2xl" />
          </div>
        )}

        {!loading && sortedEntries.length === 0 && (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            No entries yet. Be the first to sign the guestbook!
          </p>
        )}

        {!loading &&
          sortedEntries.map((entry) => {
            const initial = (entry.user_name || "A").trim()[0]?.toUpperCase() || "A";
            const isPurpleInitial = !entry.user_avatar;

            return (
              <div
                key={entry.id}
                className="group relative flex items-start gap-4 transition-opacity duration-300"
              >
                {/* Avatar */}
                <div className="shrink-0 relative">
                  {entry.user_avatar ? (
                    <img
                      src={entry.user_avatar}
                      alt={entry.user_name}
                      className="w-10 h-10 rounded-xl object-cover border border-neutral-200 dark:border-neutral-800"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-medium text-base shadow-xs ${
                        isPurpleInitial ? "bg-[#5e24a4]" : getAvatarBg(entry.user_name)
                      }`}
                    >
                      {initial}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                      {entry.user_name}{" "}
                      <span className="font-normal text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm ml-0.5">
                        signed the guestbook
                      </span>
                    </p>
                    <time
                      dateTime={entry.created_at}
                      className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 font-mono shrink-0"
                    >
                      {formatRelativeTime(entry.created_at)}
                    </time>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-300 mt-1 leading-relaxed break-words">
                    {entry.message}
                  </p>
                </div>

                {/* Optional owner heart reaction badge */}
                {entry.has_owner_heart && (
                  <div className="absolute right-0 bottom-0 translate-y-1 flex items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                        alt="Owner Reaction"
                        className="w-5 h-5 rounded-full object-cover border border-white dark:border-neutral-900 shadow-xs"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] ring-1 ring-white dark:ring-neutral-900">
                        <FiHeart size={7} className="fill-current text-white" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
