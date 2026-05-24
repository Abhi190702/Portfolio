"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const Room3D = dynamic(() => import("@/components/Room3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[720px] w-full border border-cyan-400/15 bg-[#0a0a0f]" />
  ),
});

const RoomSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("room-section-active", entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => {
      document.body.classList.remove("room-section-active");
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="room"
      className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-24 md:px-8"
    >
      <Link href="#room">
        <h2
          className={cn(
            "bg-clip-text text-center text-4xl text-transparent md:text-7xl",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
          )}
        >
          My Space
        </h2>
      </Link>
      <p className="mx-auto mb-8 mt-5 max-w-3xl text-center font-mono text-sm text-neutral-600 dark:text-neutral-400">
        {"// explore the room - click objects to interact"}
      </p>
      <div
        className={cn(
          "overflow-hidden rounded-md bg-[#0a0a0f] opacity-0 shadow-2xl shadow-cyan-500/10 transition-opacity duration-700",
          shouldMount && "opacity-100"
        )}
      >
        {shouldMount ? <Room3D /> : null}
      </div>
      <style jsx global>{`
        .site-animated-background {
          transition: opacity 300ms ease;
        }

        .room-section-active .site-animated-background {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default RoomSection;
