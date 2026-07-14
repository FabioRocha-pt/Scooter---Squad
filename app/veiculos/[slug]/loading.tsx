export default function Loading() {
  return (
    <main className="min-h-svh bg-night text-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <div className="skeleton mb-6 h-4 w-64 rounded-full" />
      <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="skeleton aspect-[4/3] w-full rounded-3xl" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="skeleton h-10 w-3/4 rounded-xl" />
          <div className="skeleton h-4 w-1/2 rounded-full" />
          <div className="skeleton h-24 w-full rounded-2xl" />
          <div className="skeleton h-12 w-full rounded-full" />
          <div className="skeleton h-32 w-full rounded-2xl" />
        </div>
      </div>
      </div>
    </main>
  );
}
