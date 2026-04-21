"use client";
import React from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

const Page = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log(data);


  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-2xl space-y-10">
        
        {/* Header */}
        <section className="space-y-4">
          <h1 className="text-3xl font-semibold">Contact</h1>

          <p className="text-gray-500">
            It's currently{" "}
            {new Date().toLocaleTimeString("en-US", {
              timeZone: "Asia/Kathmandu",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            here in Biratchowk, Nepal  .
            Feel free to reach out but please don't just say hello. I will get
            back to you as soon as possible.
          </p>

  
         
        </section>

        {/* Social Links */}
        <section className="space-y-3">
          <h2 className="text-xl font-medium">Connect</h2>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <a href="https://github.com/NuxGajurel" className="hover:underline">
              <AiOutlineGithub size={35}/>
            </a>
            <a href="https://www.linkedin.com/in/nux-gajurel-355962348/" className="hover:underline">
              <FaLinkedin size={35} />
            </a>
            <a href="https://www.instagram.com/nuxgajurel/" className="hover:underline">
              <FaInstagram size={35} />
            </a>
            <a href="mailto:nuxgajurel46@gmail.com" className="hover:underline">
              <MdOutlineMail size={35} />
            </a>
          </div>
        </section>

   
        <section className="space-y-6">
          <h2 className="text-xl font-medium">Send me a message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                placeholder="Joan Doe"
                required
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                name="email"
                type="email"
                placeholder="joan.doe@example.com"
                required
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            
            <select
              name="subject"
              required
              className="w-full rounded-lg border px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Please choose one...</option>
              <option>General Inquiry</option>
              <option>Work Opportunity</option>
              <option>Collaboration</option>
            </select>

            <textarea
              name="message"
              rows={5}
              placeholder="Hello!"
              required
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="rounded-lg bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </section>

      </div>
    </main>
  );
};

export default Page;