"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineGithub } from "react-icons/ai";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FiMail } from "react-icons/fi";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await sendEmail(formData);
      
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: result.success as string });
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
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
              {new Date().toLocaleTimeString("en-US", {
                timeZone: "Asia/Kathmandu",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>{" "}
            here in Biratchowk, Nepal.
            Feel free to reach out but please don't just say hello. I will get
            back to you as soon as possible.
          </p>
        </motion.section>

        {/* Social Links */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Connect</h2>
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={28} className="group-hover:rotate-6 transition-transform" />
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.label}
                </span>
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <select
                  name="subject"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Please choose one...</option>
                  <option>General Inquiry</option>
                  <option>Work Opportunity</option>
                  <option>Collaboration</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Hello!"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 pt-4">
              
              <motion.button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-500 px-8 py-3 font-semibold border border-gray-200 dark:border-gray-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                <FiMail size={18} />
                {isPending ? "Sending..." : "Send"}
              </motion.button>
            </div>

            {message && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm mt-4 font-medium px-4 py-2 rounded-lg border ${
                  message.type === "success" 
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800" 
                    : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800"
                }`}
              >
                {message.text}
              </motion.p>
            )}
          </form>
        </motion.section>

      </motion.div>
    </main>
  );
};

export default Page;
