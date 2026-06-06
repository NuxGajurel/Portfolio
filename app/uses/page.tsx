import Image from "next/image";

const gearItems = [
  {
    title: "Laptop",
    name: "Acer Swift Go 14 OLED 2024",
    image: "/acer.webp",
    tags: ["Acer", "Laptop", "Windows"],
  },
  {
    title: "Keyboard",
    name: "JD Digital World",
    image: "/keyboard.jpg",
    tags: ["Normal Keyboard"],
  },
  {
    title: "Mouse",
    name: "Dell Wireless Mouse",
    image: "/mouse.jpg",
    tags: ["Dell", "Wireless"],
  },
  {
    title: "Laptop Stand",
    name: "Aluminium Alloy Adjustable Laptop Stand For 10 to 17 Inches Laptop/Tab",
    image: "/stand.webp",
    tags: ["Laptop Stand", "Aluminum"],
  },
  {
    title: "Phone",
    name: "Redmi Note 10",
    image: "/phone.png",
    tags: ["Phone", "Android"],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="max-w-5xl mx-auto px-5 py-12">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-[32px] font-serif font-semibold text-zinc-900 dark:text-white">
            My Gear & Uses
          </h1>

          <p className="mt-3 text-[16px] text-zinc-600 dark:text-zinc-400">
            A peek into the tools and technologies I use daily.
          </p>
        </div>

        {/* Section Title */}
        <h2 className="text-[30px] font-serif font-semibold text-zinc-900 dark:text-white mb-8">
          Gear
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          {gearItems.map((item) => (
            <div
              key={item.title}
              className="border-r border-b border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center px-4 py-10 min-h-[260px] hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              {/* Image */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-[16px] md:text-[17px] font-medium text-zinc-800 dark:text-white">
                {item.title}
              </h3>

              {/* Name */}
              <p className="mt-2 text-[14px] text-zinc-500 dark:text-zinc-400 max-w-[180px]">
                {item.name}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}