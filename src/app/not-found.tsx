export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center px-6">
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-500">404</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
          This page could not be found.
        </h1>
        <p className="mt-2 text-neutral-600">
          The plan may be unpublished or the link is incorrect.
        </p>
        <a
          href="/programs"
          className="mt-6 inline-flex rounded-full bg-black px-4 py-2 text-white"
        >
          Browse Programs
        </a>
      </div>
    </main>
  );
}
