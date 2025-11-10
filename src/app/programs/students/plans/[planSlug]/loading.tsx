export default function LoadingPlan() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 space-y-8">
        {/* header skeleton */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-full md:w-[260px]">
            <div className="aspect-[4/3] md:aspect-square w-full rounded-2xl bg-neutral-200 animate-pulse" />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-6 w-64 bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-40 bg-neutral-200 rounded animate-pulse" />
            <div className="grid gap-3 sm:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-9 rounded-full border bg-white">
                  <div className="h-full w-40 bg-neutral-100 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* description skeleton */}
        <div className="rounded-2xl border bg-white p-5 sm:p-6 space-y-3">
          <div className="h-5 w-40 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse" />
        </div>

        {/* weeks skeleton */}
        <div className="space-y-4">
          <div className="h-5 w-28 bg-neutral-200 rounded animate-pulse" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border bg-white p-4 flex items-center gap-3">
              <div className="h-14 w-14 rounded-lg bg-neutral-200 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 bg-neutral-200 rounded animate-pulse" />
                <div className="h-3 w-1/3 bg-neutral-200 rounded animate-pulse" />
              </div>
              <div className="h-5 w-5 rounded-full bg-neutral-200 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
