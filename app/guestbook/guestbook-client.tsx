"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  FiSend,
  FiLoader,
  FiHeart,
  FiLogOut,
  FiCornerDownRight,
  FiTrash2,
  FiShield,
} from "react-icons/fi";
import { LuListFilter } from "react-icons/lu";
import { isClerkUserAdmin } from "@/lib/admin";

export interface GuestbookReply {
  id: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  message: string;
  is_admin?: boolean;
}

export interface GuestbookEntry {
  id: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  message: string;
  is_admin?: boolean;
  has_owner_heart?: boolean;
  owner_heart_avatar?: string;
  replies?: GuestbookReply[];
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

  const isAdmin = Boolean(isLoaded && isSignedIn && isClerkUserAdmin(user));

  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Reply & Like state
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [likingIds, setLikingIds] = useState<Record<string, boolean>>({});
  const [deletingReplyIds, setDeletingReplyIds] = useState<Record<string, boolean>>({});

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

  // Toggle owner like on comment (Admin only)
  const handleToggleLike = async (entryId: string) => {
    if (!isAdmin || likingIds[entryId]) return;

    const targetEntry = entries.find((e) => e.id === entryId);
    if (!targetEntry) return;

    const previousHeartState = targetEntry.has_owner_heart;
    const previousHeartAvatar = targetEntry.owner_heart_avatar;
    const newHeartState = !previousHeartState;
    const adminAvatar = user?.imageUrl || "/Nuxgajurel.jpg";

    // Optimistic UI update
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? {
              ...e,
              has_owner_heart: newHeartState,
              owner_heart_avatar: newHeartState ? adminAvatar : undefined,
            }
          : e
      )
    );

    setLikingIds((prev) => ({ ...prev, [entryId]: true }));

    try {
      const res = await fetch("/api/guestbook/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update like status");
      }
    } catch (err) {
      console.error("Error liking comment:", err);
      // Revert optimistic update
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? {
                ...e,
                has_owner_heart: previousHeartState,
                owner_heart_avatar: previousHeartAvatar,
              }
            : e
        )
      );
    } finally {
      setLikingIds((prev) => {
        const next = { ...prev };
        delete next[entryId];
        return next;
      });
    }
  };

  // Submit admin reply
  const handleReplySubmit = async (e: React.FormEvent, entryId: string) => {
    e.preventDefault();
    if (!isAdmin || !replyMessage.trim() || replySubmitting) return;

    setReplySubmitting(true);
    setReplyError(null);

    try {
      const res = await fetch("/api/guestbook/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId, message: replyMessage.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to post reply");
      }

      if (data.reply) {
        setEntries((prev) =>
          prev.map((e) =>
            e.id === entryId
              ? {
                  ...e,
                  replies: [...(e.replies || []), data.reply],
                }
              : e
          )
        );
      }

      setReplyMessage("");
      setReplyingToId(null);
    } catch (err) {
      setReplyError(err instanceof Error ? err.message : "Failed to post reply");
    } finally {
      setReplySubmitting(false);
    }
  };

  // Delete reply (Admin only)
  const handleDeleteReply = async (entryId: string, replyId: string) => {
    if (!isAdmin || deletingReplyIds[replyId]) return;

    setDeletingReplyIds((prev) => ({ ...prev, [replyId]: true }));

    try {
      const res = await fetch("/api/guestbook/reply", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId, replyId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete reply");
      }

      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? {
                ...e,
                replies: (e.replies || []).filter((r) => r.id !== replyId),
              }
            : e
        )
      );
    } catch (err) {
      console.error("Error deleting reply:", err);
    } finally {
      setDeletingReplyIds((prev) => {
        const next = { ...prev };
        delete next[replyId];
        return next;
      });
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
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {user?.fullName || user?.username || "Signed in visitor"}
                    </h3>
                    {isAdmin && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        <FiShield size={10} />
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {isAdmin
                      ? "Admin privileges active • You can like and reply to comments"
                      : "Leave your note in the guestbook"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UserButton />
                <button
                  onClick={() => clerk.signOut()}
                  title="Sign out"
                  className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition text-xs cursor-pointer"
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
                  placeholder={isAdmin ? "Write an announcement or message..." : "Your message..."}
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
            const isReplying = replyingToId === entry.id;

            return (
              <div
                key={entry.id}
                className="group relative flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40 border border-transparent hover:border-neutral-200/50 dark:hover:border-neutral-800/60"
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
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                        {entry.user_name}
                      </p>
                      {entry.is_admin && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                          Author
                        </span>
                      )}
                      <span className="font-normal text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
                        signed the guestbook
                      </span>
                    </div>
                    <time
                      dateTime={entry.created_at}
                      className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 font-mono shrink-0"
                    >
                      {formatRelativeTime(entry.created_at)}
                    </time>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-300 leading-relaxed break-words">
                    {entry.message}
                  </p>

                  {/* Actions & Reactions Row */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    {/* Visitor/Everyone View: Author heart badge */}
                    {entry.has_owner_heart && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/50 shadow-2xs">
                        <img
                          src={entry.owner_heart_avatar || "/Nuxgajurel.jpg"}
                          alt="Author"
                          className="w-4 h-4 rounded-full object-cover ring-1 ring-rose-300 dark:ring-rose-700"
                        />
                        <FiHeart size={11} className="fill-current text-rose-500" />
                        <span className="text-[11px] font-medium">Author loved this</span>
                      </div>
                    )}

                    {/* Admin Interactive Controls */}
                    {isAdmin && (
                      <>
                        {/* Like Toggle Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleLike(entry.id)}
                          disabled={Boolean(likingIds[entry.id])}
                          title={entry.has_owner_heart ? "Remove author heart" : "Give author heart"}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            entry.has_owner_heart
                              ? "text-rose-600 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-950/50 hover:bg-rose-200/70 dark:hover:bg-rose-900/60"
                              : "text-neutral-500 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-neutral-800"
                          }`}
                        >
                          {likingIds[entry.id] ? (
                            <FiLoader size={12} className="animate-spin" />
                          ) : (
                            <FiHeart
                              size={13}
                              className={entry.has_owner_heart ? "fill-current text-rose-500" : ""}
                            />
                          )}
                          <span>{entry.has_owner_heart ? "Liked" : "Like"}</span>
                        </button>

                        {/* Reply Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (isReplying) {
                              setReplyingToId(null);
                              setReplyMessage("");
                              setReplyError(null);
                            } else {
                              setReplyingToId(entry.id);
                              setReplyMessage("");
                              setReplyError(null);
                            }
                          }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            isReplying
                              ? "text-neutral-900 dark:text-neutral-100 bg-neutral-200/80 dark:bg-neutral-750"
                              : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }`}
                        >
                          <FiCornerDownRight size={13} />
                          <span>{isReplying ? "Cancel" : "Reply"}</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Inline Reply Form for Admin */}
                  {isAdmin && isReplying && (
                    <form
                      onSubmit={(e) => handleReplySubmit(e, entry.id)}
                      className="mt-3 p-3.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 space-y-2.5 transition-all"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                          <FiCornerDownRight size={12} />
                          Replying as Admin ({user?.fullName || "Nux Gajurel"})
                        </span>
                        <span className="text-neutral-400 text-[11px]">
                          {replyMessage.length}/500
                        </span>
                      </div>
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder={`Reply to ${entry.user_name}...`}
                        rows={2}
                        maxLength={500}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 resize-none transition"
                        autoFocus
                      />
                      {replyError && (
                        <p className="text-xs text-rose-500 dark:text-rose-400">{replyError}</p>
                      )}
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingToId(null);
                            setReplyMessage("");
                            setReplyError(null);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-750 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!replyMessage.trim() || replySubmitting}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition cursor-pointer shadow-xs"
                        >
                          {replySubmitting ? (
                            <>
                              <FiLoader className="animate-spin" size={12} />
                              <span>Replying...</span>
                            </>
                          ) : (
                            <>
                              <span>Reply</span>
                              <FiSend size={11} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Threaded Replies List */}
                  {entry.replies && entry.replies.length > 0 && (
                    <div className="mt-3.5 space-y-2.5 pl-3 sm:pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
                      {entry.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="group/reply flex items-start gap-2.5 pt-1.5"
                        >
                          <img
                            src={reply.user_avatar || "/Nuxgajurel.jpg"}
                            alt={reply.user_name}
                            className="w-7 h-7 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                                {reply.user_name}
                              </span>
                              {reply.is_admin && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                  Author
                                </span>
                              )}
                              <time
                                dateTime={reply.created_at}
                                className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono ml-auto sm:ml-1"
                              >
                                {formatRelativeTime(reply.created_at)}
                              </time>

                              {isAdmin && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteReply(entry.id, reply.id)}
                                  title="Delete reply"
                                  disabled={Boolean(deletingReplyIds[reply.id])}
                                  className="opacity-0 group-hover/reply:opacity-100 p-1 text-neutral-400 hover:text-rose-500 transition-opacity ml-auto cursor-pointer"
                                >
                                  {deletingReplyIds[reply.id] ? (
                                    <FiLoader size={11} className="animate-spin" />
                                  ) : (
                                    <FiTrash2 size={11} />
                                  )}
                                </button>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-0.5 leading-relaxed break-words">
                              {reply.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
