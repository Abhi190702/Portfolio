import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, File, Github, Linkedin, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { config } from "@/data/config";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const [firstName, ...rest] = config.author.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="hero" className={cn("relative z-10 min-h-screen w-full")}>
      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-4 py-28 md:grid-cols-[1.15fr_0.85fr] md:px-8">
        <div
          className={cn(
            "z-[2] col-span-1 flex flex-col items-center md:items-start",
            "text-center md:text-left"
          )}
        >
          {!isLoading && (
            <>
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "font-mono text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    Portfolio / Developer / Security
                  </p>
                </BlurIn>
                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "mt-5 cursor-default font-display text-6xl font-semibold leading-[0.95] text-zinc-950 dark:text-white",
                          "sm:text-7xl md:text-8xl lg:text-9xl"
                        )}
                      >
                        {firstName}
                        {lastName && <br className="hidden md:block" />}
                        {lastName}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      Building quietly, shipping loudly.
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>
                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 md:text-lg"
                    )}
                  >
                    {config.role}. I build practical web, DevOps, security, and
                    AI workflow projects with a focus on polish, speed, and
                    usefulness.
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BoxReveal delay={2} width="100%" >
                  <a
                    href={config.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 block"
                  >
                    <Button className="flex w-full items-center gap-2">
                      <File size={20} />
                      <span>Resume</span>
                    </Button>
                  </a>
                </BoxReveal>
                <BoxReveal delay={2.1} width="100%">
                  <Link href={"#projects"}>
                    <Button variant="outline" className="flex w-full items-center gap-2">
                      <span>View Work</span>
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                </BoxReveal>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <Link href={config.social.github} target="_blank" aria-label="GitHub">
                  <Button variant="outline" size="icon">
                    <Github size={20} />
                  </Button>
                </Link>
                <Link href={config.social.linkedin} target="_blank" aria-label="LinkedIn">
                  <Button variant="outline" size="icon">
                    <Linkedin size={20} />
                  </Button>
                </Link>
                <Link href={`mailto:${config.email}`} aria-label="Email">
                  <Button variant="outline" size="icon">
                    <Mail size={20} />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="relative z-[2] hidden md:block">
          <div className="rounded-lg border border-zinc-200 bg-white/70 p-6 shadow-2xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/30">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-white/10">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                Current Focus
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            </div>
            <div className="mt-6 grid gap-4">
              {["DevOps tooling", "Cybersecurity labs", "AI workflow utilities"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-white/10 dark:bg-black/20 dark:text-zinc-300"
                  >
                    <span>{item}</span>
                    <span className="font-mono text-xs text-zinc-400">
                      0{index + 1}
                    </span>
                  </div>
                )
              )}
            </div>
            <p className="mt-6 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Clean portfolio now. Separate interactive room later.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
