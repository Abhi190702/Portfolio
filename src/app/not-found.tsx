import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-[#08090d] px-4 text-white">
      <section className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold md:text-7xl">
          Page Not Found
        </h1>
        <p className="mt-5 text-sm leading-7 text-zinc-400 md:text-base">
          This page is not part of the portfolio anymore. Head back home to see
          the current work, skills, resume, and contact links.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          <ArrowLeft size={16} />
          Back Home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
