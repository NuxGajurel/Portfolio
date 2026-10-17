export default function Page() {
  return (
    <main className="min-h-screen transition-colors">
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