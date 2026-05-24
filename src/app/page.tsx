"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/sections/hero";

const AnimatedBackground = dynamic(
  () => import("@/components/animated-background"),
  { ssr: false, loading: () => null }
);
const SkillsSection = dynamic(() => import("@/components/sections/skills"), {
  loading: () => <div className="min-h-screen" />,
});
const ProjectsSection = dynamic(() => import("@/components/sections/projects"), {
  loading: () => <div className="min-h-screen" />,
});
const RoomSection = dynamic(() => import("@/components/sections/room"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});
const ContactSection = dynamic(() => import("@/components/sections/contact"), {
  loading: () => <div className="min-h-screen" />,
});

function MainPage() {
  const [roomActive, setRoomActive] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);

  useEffect(() => {
    const browserWindow = window as typeof window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const id = browserWindow.requestIdleCallback
      ? browserWindow.requestIdleCallback(() => setBackgroundReady(true), {
          timeout: 1600,
        })
      : window.setTimeout(() => setBackgroundReady(true), 700);

    return () => {
      if (browserWindow.cancelIdleCallback) {
        browserWindow.cancelIdleCallback(id);
      } else {
        window.clearTimeout(id);
      }
    };
  }, []);

  useEffect(() => {
    const roomSection = document.getElementById("room");
    if (!roomSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setRoomActive(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.05 }
    );

    observer.observe(roomSection);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SmoothScroll>
        <main className={cn("bg-slate-100 dark:bg-transparent")}>
          {backgroundReady && !roomActive && (
            <div className="site-animated-background top-0 z-0 fixed w-full h-screen">
              <AnimatedBackground />
            </div>
          )}
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <RoomSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}

export default MainPage;
