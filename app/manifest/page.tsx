export default function ManifestPage() {
    return (
        <main className="min-h-screen">
            <div className="max-w-4xl mx-auto px-5 py-8">
                {/* Header */}
                <div className="max-w-2xl">
                    <h1 className="text-[28px] font-serif font-semibold text-zinc-900 dark:text-white">
                        Manifest List
                    </h1>
                </div>

                {/* Empty State */}
                <section className="mt-12">
                    <p className="text-zinc-500 dark:text-zinc-400 font-mono text-base">
                        Nothing posted yet.
                    </p>
                </section>
            </div>
        </main>
    );
}