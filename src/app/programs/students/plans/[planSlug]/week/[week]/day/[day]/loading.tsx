export default function LoadingDay() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="mx-auto max-w-[1000px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 space-y-8">
        {/* header */}
        <div className="rounded-2xl border bg-white p-5 sm:p-6 space-y-3">
          <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse" />
          <div className="h-6 w-64 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-80 bg-neutral-200 rounded animate-pulse" />
        </div>
        {/* 3 block cards */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border bg-white p-5 space-y-3">
            <div className="h-5 w-36 bg-neutral-200 rounded animate-pulse" />
            <div className="h-28 w-full bg-neutral-100 rounded animate-pulse" />
          </div>
        ))}
        <div className="flex justify-end">
          <div className="h-9 w-40 rounded-full bg-neutral-200 animate-pulse" />
        </div>
      </section>
    </main>
  );
}
