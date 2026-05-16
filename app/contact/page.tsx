"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
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
        <motion.section variants={itemVariants} className="space-y-10 sm:bg-gray-50/50 sm:dark:bg-gray-900/30 sm:p-10 sm:rounded-[3rem] sm:border sm:border-gray-100 sm:dark:border-gray-800 sm:backdrop-blur-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tighter uppercase italic">Send me a message</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Usually responds within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2 group">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-black dark:group-focus-within:text-white">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-800 px-1 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-all text-xl text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-black dark:group-focus-within:text-white">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-800 px-1 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-all text-xl text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-black dark:group-focus-within:text-white">Subject</label>
              <select
                name="subject"
                required
                className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-800 px-1 py-3 text-xl text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all appearance-none cursor-pointer"
              >
                <option value="" className="dark:bg-black">Select an option...</option>
                <option className="dark:bg-black">General Inquiry</option>
                <option className="dark:bg-black">Work Opportunity</option>
                <option className="dark:bg-black">Collaboration</option>
              </select>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-black dark:group-focus-within:text-white">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Write your thoughts..."
                required
                className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-800 px-1 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-all text-xl text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700 resize-none"
              />
            </div>

            <div className="pt-6">
              <motion.button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto rounded-full bg-black dark:bg-white text-white dark:text-black px-12 py-4 font-bold shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPending ? "Sending..." : "Send Request"}
              </motion.button>

              {message && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm mt-8 font-bold px-6 py-3 rounded-2xl border ${
                    message.type === "success" 
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800" 
                      : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800"
                  }`}
                >
                  {message.text}
                </motion.p>
              )}
            </div>
          </form>
        </motion.section>

      </motion.div>
    </main>
  );
};

export default Page;
