"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import projects, { Project } from "@/data/projects";

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative z-10 mx-auto min-h-screen max-w-7xl px-4 py-24 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          Selected Work
        </p>
        <Link href={"#projects"}>
          <h2 className="mt-3 font-display text-4xl font-semibold text-zinc-950 dark:text-white md:text-6xl">
            Projects
          </h2>
        </Link>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 md:text-base">
          A tighter showcase of the repositories and products that best reflect
          how I build.
        </p>
      </div>
      <div className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const href = project.github || project.live;
  const isContainedImage = project.id === "deploy-sense" || project.id === "ctx";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title} on GitHub`}
      className="group block w-full overflow-visible rounded-lg bg-transparent p-0 text-left focus-visible:outline-none"
    >
      <article className="relative min-h-[390px] w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 shadow-xl shadow-black/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-zinc-400 group-focus-visible:-translate-y-1 group-focus-visible:border-zinc-400 group-focus-visible:ring-2 group-focus-visible:ring-zinc-400/50 dark:border-white/10 dark:bg-black dark:shadow-black/20 dark:group-hover:border-white/25">
        <div
          className="relative h-[230px] w-full overflow-hidden"
          style={{
            background: isContainedImage
              ? "linear-gradient(135deg, #0d1117 0%, #111827 60%, #0a1628 100%)"
              : "#09090b",
          }}
        >
          <Image
            src={project.src}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            quality={85}
            className={`transition-transform duration-500 group-hover:scale-[1.04] ${
              isContainedImage ? "object-contain p-6" : "object-cover"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4 rounded-md border border-white/15 bg-black/60 px-2 py-1 font-mono text-[11px] text-white/70 backdrop-blur">
            {project.id}
          </div>
          <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-black/60 text-white/80 backdrop-blur transition-colors group-hover:text-white">
            <ArrowUpRight size={17} />
          </div>
        </div>
        <div className="space-y-3 p-5 text-left">
          <div className="flex items-center justify-between gap-3">
            <div className="text-lg font-semibold text-white">{project.title}</div>
            <div
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor: project.accent,
                boxShadow: `0 0 18px ${project.accent}`,
              }}
            />
          </div>
          <p className="line-clamp-3 text-xs leading-relaxed text-white/58">
            {project.summary}
          </p>
          <div className="flex items-center justify-between gap-3">
            <div className="w-fit rounded-md bg-white px-2 py-1 text-xs font-medium text-black">
              {project.category}
            </div>
            <span className="font-mono text-[11px] text-white/45 transition-colors group-hover:text-white/75">
              Open GitHub
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectsSection;
