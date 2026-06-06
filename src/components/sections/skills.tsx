import React from "react";
import {
  BrainCircuit,
  Container,
  GitBranch,
  Globe2,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const skillGroups = [
  {
    title: "Frontend",
    icon: Globe2,
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    accent: "text-cyan-400",
  },
  {
    title: "Backend",
    icon: Terminal,
    items: ["Node.js", "Python", "REST APIs", "Auth", "Automation"],
    accent: "text-emerald-400",
  },
  {
    title: "DevOps",
    icon: Container,
    items: ["Docker", "Kubernetes", "GitHub Actions", "Linux", "CI/CD"],
    accent: "text-orange-400",
  },
  {
    title: "Security",
    icon: ShieldCheck,
    items: ["Networking", "Firewalls", "DNS", "VPN", "Secure Systems"],
    accent: "text-violet-400",
  },
  {
    title: "AI Workflow",
    icon: BrainCircuit,
    items: ["LLM tooling", "Context systems", "Prompting", "CLI tools"],
    accent: "text-sky-400",
  },
  {
    title: "Engineering",
    icon: GitBranch,
    items: ["Git", "Testing", "Debugging", "Documentation", "Product polish"],
    accent: "text-rose-400",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          Technical Stack
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-zinc-950 dark:text-white md:text-6xl">
          Skills That Ship Products
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 md:text-base">
          A focused stack across web engineering, DevOps, cybersecurity, and AI
          workflow tooling.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <article
              key={group.title}
              className="rounded-lg border border-zinc-200/80 bg-white/75 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
                  <Icon className={group.accent} size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white">
                  {group.title}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
