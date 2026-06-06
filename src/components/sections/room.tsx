"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const Room3D = dynamic(() => import("@/components/Room3D"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen w-full bg-[#072446]" />
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
      className="relative z-10 min-h-screen w-full overflow-hidden bg-[#072446]"
    >
      <div
        className={cn(
          "min-h-screen w-full opacity-0 transition-opacity duration-700",
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
