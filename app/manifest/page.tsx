import Image from "next/image";

const bucketList = [
    {
        title: "Buy a Iphone 17",
        completed: false,
        image: "/iphone.jpg",
    },
    {
        title: "Buy a Sony FX30",
        completed: false,
        image: "/fx.avif",
    },
    {
        title: "Earn NPR 100k By This Year",
        completed: false,
        image: null,
    },
    {
        title: "Buy a MacBook Air M4",
        completed: false,
        image: "/mac.jpg",
    },
    {
        title: "Buy a Sony Alpha A7C",
        completed: false,
        image: "/sony.avif",
    },
];

export default function ManifestPage() {
    const completedCount = bucketList.filter(
        (item) => item.completed
    ).length;

    return (
        <main className="min-h-screen">
            <div className="max-w-4xl mx-auto px-5 py-8">
                {/* Header */}
                <div className="max-w-2xl">
                    <h1 className="text-[28px] font-serif font-semibold text-zinc-900 dark:text-white">
                        Manifest List
                    </h1>


                </div>

                {/* Bucket List */}
                <section className="mt-12">
                    <h2 className="text-[26px] font-serif font-semibold text-zinc-900 dark:text-white mb-5">
                        Bucket List
                    </h2>

                    <div>
                        {bucketList.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800"
                            >
                                <div className="flex items-center gap-3">
                                    {/* Checkbox */}
                                    <div
                                        className={`w-5 h-5 rounded border flex items-center justify-center ${item.completed
                                            ? "bg-black border-black"
                                            : "border-zinc-300 dark:border-zinc-600"
                                            }`}
                                    >
                                        {item.completed && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>

                                    <span className="font-mono text-[15px] md:text-[16px] text-zinc-700 dark:text-white">
                                        {item.title}
                                    </span>
                                </div>

                                {item.image && (
                                    <div className="relative w-10 h-10 md:w-12 md:h-12">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-right text-sm text-zinc-500 dark:text-zinc-400">
                        {completedCount} out of {bucketList.length} completed.
                    </div>
                </section>
            </div>
        </main>
    );
}