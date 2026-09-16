"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineGithub } from "react-icons/ai";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { sendEmail } from "../actions/send-email";

const socialLinks = [
  { icon: AiOutlineGithub, href: "https://github.com/NuxGajurel", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/nux-gajurel-355962348/", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/nuxgajurel/", label: "Instagram" },
  { icon: MdOutlineMail, href: "mailto:nuxgajurel46@gmail.com", label: "Email" },
];

const Page = () => {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState<string>("");

  React.useEffect(() => {
    setTime(
      new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(formElement);

    try {
      const result = await sendEmail(formData);

      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: result.success as string });
        formElement.reset();
        setSubject("");
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Something went wrong. Please try again." });
    } finally {
      setIsPending(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen py-16 px-4 transition-colors duration-500">
      <motion.div
        className="max-w-2xl mx-auto space-y-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {/* Header */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            It's currently{" "}
            <span className="font-medium text-black dark:text-white">
              {time || "--:--"}
            </span>{" "}
            here in Biratchowk, Nepal.
            Feel free to reach out but please don't just say hello. I will get
            back to you as soon as possible.
          </p>
        </motion.section>

        {/* Social Links */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Connect</h2>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-900/40 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <link.icon size={20} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
                <span className="text-sm font-medium">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send me a message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Joan Doe"
                    required
                    className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="joan.doe@example.com"
                    required
                    className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <div className="relative">
                  <select
                    name="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 pr-10 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-dashed focus:outline-1 dark:focus:outline-gray-400 focus:outline-offset-2 transition-all appearance-none cursor-pointer ${subject ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                      }`}
                  >
                    <option value="" disabled className="text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900">
                      Please choose one...
                    </option>
                    <option value="General Inquiry" className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
                      General Inquiry
                    </option>
                    <option value="Collaboration" className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
                      Collaboration
                    </option>
                    <option value="Work Opportunity" className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
                      Work Opportunity
                    </option>
                    <option value="Feedback" className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
                      Feedback
                    </option>
                    <option value="Other" className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
                      Other
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 dark:text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Hello, Nux!"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none"
                />

              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 pt-2">
              <motion.button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-7 py-2.5 font-semibold text-sm border border-transparent transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M22 5.5H9C7.9 5.5 7 6.4 7 7.5V16.5C7 17.61 7.9 18.5 9 18.5H22C23.11 18.5 24 17.61 24 16.5V7.5C24 6.4 23.11 5.5 22 5.5M22 16.5H9V9.17L15.5 12.5L22 9.17V16.5M15.5 10.81L9 7.5H22L15.5 10.81M5 16.5C5 16.67 5.03 16.83 5.05 17H1C.448 17 0 16.55 0 16S.448 15 1 15H5V16.5M3 7H5.05C5.03 7.17 5 7.33 5 7.5V9H3C2.45 9 2 8.55 2 8S2.45 7 3 7M1 12C1 11.45 1.45 11 2 11H5V13H2C1.45 13 1 12.55 1 12Z" />
                </svg>
                <span>{isPending ? "Sending..." : "Send"}</span>
              </motion.button>
            </div>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm mt-4 font-medium px-4 py-2 rounded-lg border ${message.type === "success"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800"
                  }`}
              >
                {message.text}
              </motion.p>
            )}
          </form>
        </motion.section>

        {/* Calendly Booking Section */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40 p-8 text-center space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Georgia, serif" }}>
                Schedule a Call
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
              The most efficient way to start the conversation is to book a complimentary 30-minute consultation.
            </p>
            <motion.a
              href="https://calendly.com/nuxgajurel46/web-development-consultation-for-30-min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a 30-Min Consultation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.a>
          </div>
        </motion.section>

      </motion.div>
    </main>
  );
};

export default Page;

