"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";
import Image from "next/image";

import SmoothScroll from "../smooth-scroll";
import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto min-h-screen px-4">
      <Link href={"#projects"}>
        <h2
          className={cn(
            "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 mb-16"
          )}
        >
          Projects
        </h2>
      </Link>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <Modall key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
const Modall = ({ project }: { project: Project }) => {
  return (
    <div className="w-full">
      <Modal>
        <ModalTrigger className="group/modal-btn block w-full overflow-visible rounded-lg bg-transparent p-0 text-left">
          <div className="relative min-h-[390px] w-full overflow-hidden rounded-lg border border-white/10 bg-black shadow-xl shadow-black/20 transition-all duration-300 group-hover/modal-btn:-translate-y-1 group-hover/modal-btn:border-white/25">
            <div
              className="relative h-[230px] w-full overflow-hidden"
              style={{
                background:
                  project.id === "deploy-sense"
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
                className={`transition-transform duration-500 group-hover/modal-btn:scale-[1.04] ${
                  project.id === "deploy-sense"
                    ? "object-contain p-6"
                    : "object-cover"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute left-4 top-4 rounded-md border border-white/15 bg-black/60 px-2 py-1 font-mono text-[11px] text-white/70 backdrop-blur">
                {project.id}
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
              <div className="w-fit rounded-md bg-white px-2 py-1 text-xs font-medium text-black">
                {project.category}
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <Link href={project.live} target="_blank">
              <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                Visit
              </button>
            </Link>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        {project.title}
      </h4>
      <div
        className="relative mx-auto mb-8 aspect-video w-full max-w-3xl overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
        style={{
          background:
            project.id === "deploy-sense"
              ? "linear-gradient(135deg, #0d1117 0%, #111827 60%, #0a1628 100%)"
              : "#000",
        }}
      >
        <Image
          src={project.src}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          quality={90}
          className={project.id === "deploy-sense" ? "object-contain p-10" : "object-cover"}
          priority={false}
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        {project.skills.frontend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Frontend
            </p>
            <FloatingDock items={project.skills.frontend} />
          </div>
        )}
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      {project.content}
    </>
  );
};
