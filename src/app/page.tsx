"use client";

import React from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/sections/hero";

const SkillsSection = dynamic(() => import("@/components/sections/skills"), {
  loading: () => <div className="min-h-screen" />,
});
const ProjectsSection = dynamic(() => import("@/components/sections/projects"), {
  loading: () => <div className="min-h-screen" />,
});
const ContactSection = dynamic(() => import("@/components/sections/contact"), {
  loading: () => <div className="min-h-screen" />,
});

function MainPage() {
  return (
    <>
      <SmoothScroll>
        <main
          className={cn(
            "relative overflow-hidden bg-[#f7f7f4] text-zinc-950",
            "dark:bg-[#08090d] dark:text-zinc-50"
          )}
        >
          <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(24,24,27,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,0.05)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}

export default MainPage;
