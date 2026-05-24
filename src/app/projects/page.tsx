"use client";

import projects from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

function Page() {
  return (
    <div className="container mx-auto h-full px-4 text-zinc-300 md:px-[50px] xl:px-[150px]">
      <h1 className="mb-[50px] mt-[100px] text-4xl">Projects</h1>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li
            className="min-h-[390px] overflow-hidden rounded-md border border-zinc-700 bg-black/40 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-zinc-500"
            key={project.id}
          >
            <div className="relative h-[210px] overflow-hidden bg-zinc-950">
              <Image
                src={project.src}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                quality={70}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
              <div className="absolute left-5 top-5 font-mono text-xs text-white/55">
                {project.id}
              </div>
            </div>
            <div className="p-5 text-zinc-300">
              <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-black">
                {project.category}
              </span>
              <h2 className="mt-4 text-xl font-bold">{project.title}</h2>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                {project.summary}
              </p>
              <Link
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 font-mono text-sm text-white transition hover:border-zinc-400 hover:bg-white hover:text-black"
              >
                Open repository <ArrowUpRight size={16} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
