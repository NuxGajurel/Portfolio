export type Project = {
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  icon: string;
  preview: string;
  date: string;
  url: string;
  color?: string;
};

export const projects: Project[] = [
  {
    slug: "mahalaxmi-traders",
    name: "Mahalaxmi Traders",
    description: "Client project for a trusted hardware and construction business",
    fullDescription:
      "A full-featured business website built for Mahalaxmi Traders, a trusted hardware and construction materials supplier. The site showcases their product catalog, highlights their association with Kajaria — one of India's top tile brands — and provides customers with easy ways to get in touch.",
    icon: "/maha.png",
    preview: "/Screenshot 2026-08-18 172148.png",
    color: "#f97316",
    date: "Jan. 2025",
    url: "https://mahalaxmitraders.com/",
  },
  {
    slug: "bloomhaven",
    name: "BloomHaven",
    description: "E-commerce platform for selling bouquets of flowers and plants",
    fullDescription:
      "An elegant modern e-commerce platform designed for selling exquisite bouquets, plants, and floral gifts. Features dynamic shopping cart, product filtering, smooth checkout, and a visually appealing minimalist aesthetic.",
    icon: "/store1.png",
    preview: "/haven2.png",
    color: "#ec4899",
    date: "Mar. 2026",
    url: "https://bloomhaven.vercel.app/",
  },
  {
    slug: "web-nepal",
    name: "Web Nepal",
    description: "Platform for learners to learn web development",
    fullDescription:
      "A dedicated interactive platform built to help students and aspiring developers in Nepal learn modern web technologies. Features curated learning tracks, coding roadmaps, and community resources.",
    icon: "/web.png",
    preview: "/webne.png",
    color: "#3b82f6",
    date: "Mar. 2025",
    url: "https://hackathon-webnepal.netlify.app/",
  },
  {
    slug: "saral-sewa",
    name: "Saral-Sewa",
    description: "AI-powered healthcare management system for rural areas of Nepal",
    fullDescription:
      "An AI-powered healthcare management platform created to make medical consultations, patient record tracking, and health assistance accessible and straightforward in rural communities across Nepal.",
    icon: "/logo (2).webp",
    preview: "/logo (2).webp",
    color: "#22c55e",
    date: "Jun. 2025",
    url: "https://saralseewa.vercel.app/",
  },
  {
    slug: "personal-blog",
    name: "Personal Blog Site",
    description: "A personal blog site to share thoughts and experiences on web development",
    fullDescription:
      "A minimalist, content-focused blogging platform crafted to share tutorials, engineering articles, thoughts, and lessons learned from building web applications and navigating software development.",
    icon: "/bhai.jpg",
    preview: "/v.png",
    color: "#8b5cf6",
    date: "Jan. 2026",
    url: "https://nuxblogs.vercel.app/",
  },
  {
    slug: "portfolio",
    name: "Portfolio Website",
    description: "Showcasing my skills and projects",
    fullDescription:
      "My personal portfolio website designed with modern aesthetics, dark mode support, smooth micro-animations, and responsive layouts to showcase my developer journey, featured projects, and tech stack.",
    icon: "/nuux.jpg",
    preview: "/port.png",
    color: "#6366f1",
    date: "Jan. 2026",
    url: "https://nuxgajurel.vercel.app/",
  },
  {
    slug: "book-store",
    name: "Book Management System",
    description: "A simple book management system for tracking your reading list",
    fullDescription:
      "A full-stack book tracking and cataloging web application that allows users to manage reading goals, organize collections, write book reviews, and manage inventory seamlessly.",
    icon: "/book.jpg",
    preview: "/book.png",
    color: "#eab308",
    date: "Dec. 2025",
    url: "https://github.com/NuxGajurel/BookStore.git",
  },
];
