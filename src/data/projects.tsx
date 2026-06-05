import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiCss3,
  SiDocker,
  SiJavascript,
  SiKubernetes,
  SiPython,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const ProjectsLinks = ({
  live,
  repo,
}: {
  live: string;
  repo?: string;
}) => {
  const hasSeparateSource = Boolean(repo && repo !== live);

  return (
    <div className="my-6 flex flex-col items-center justify-start gap-3 md:flex-row">
      <Link
        className="flex gap-2 font-mono underline"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant="default" size="sm">
          {hasSeparateSource ? "View Live" : "Open Repository"}
          <ArrowUpRight className="ml-3 h-5 w-5" />
        </Button>
      </Link>
      {hasSeparateSource ? (
        <Link
          className="flex gap-2 font-mono underline"
          rel="noopener"
          target="_new"
          href={repo as string}
        >
          <Button variant="outline" size="sm">
            Source
            <ArrowUpRight className="ml-3 h-5 w-5" />
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const skill = (title: string, icon: ReactNode): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon,
});

const PROJECT_SKILLS = {
  react: skill("React", <RiReactjsFill />),
  next: skill("Next.js", <RiNextjsFill />),
  node: skill("Node.js", <RiNodejsFill />),
  js: skill("JavaScript", <SiJavascript />),
  ts: skill("TypeScript", <SiTypescript />),
  tailwind: skill("Tailwind", <SiTailwindcss />),
  docker: skill("Docker", <SiDocker />),
  python: skill("Python", <SiPython />),
  css: skill("CSS3", <SiCss3 />),
  kubernetes: skill("Kubernetes", <SiKubernetes />),
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: ReactNode | any;
  github?: string;
  live: string;
  accent: string;
  summary: string;
};

const projects: Project[] = [
  {
    id: "deploy-sense",
    category: "DevOps CLI",
    title: "DeploySense",
    src: "/assets/projects-screenshots/deploy-sense/landing.png",
    screenshots: ["/assets/projects-screenshots/deploy-sense/landing.png"],
    live: "https://deploy-sense-web.vercel.app/",
    github: "https://github.com/Abhi190702/DeploySense",
    accent: "#f97316",
    summary:
      "Open-source DevOps intelligence CLI that scans Dockerfiles, Kubernetes, GitHub Actions, and Compose configs before deployments break production.",
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.docker, PROJECT_SKILLS.kubernetes],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            DeploySense scans Dockerfiles, GitHub Actions workflows, Kubernetes
            manifests, Docker Compose files, and deployment logs. It returns
            health scores, risk categories, plain-English explanations, and
            copy-paste fixes with a live web dashboard.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "ghost-gate",
    category: "Cybersecurity",
    title: "GhostGate",
    src: "/assets/projects-screenshots/ghost-gate/landing.png",
    screenshots: ["/assets/projects-screenshots/ghost-gate/landing.png"],
    live: "https://github.com/Abhi190702/GhostGate",
    github: "https://github.com/Abhi190702/GhostGate",
    accent: "#00d4ff",
    summary:
      "A virtual privacy router lab for Linux networking, NAT, DNS filtering, firewalls, Tor routing, WireGuard VPN, and traffic monitoring.",
    skills: {
      frontend: [PROJECT_SKILLS.js],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.docker],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            GhostGate is a practical privacy engineering lab for learning how
            network traffic moves, where it can be filtered, and how defensive
            routing tools fit together.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "ctx",
    category: "AI Workflow Tool",
    title: "ctx",
    src: "/assets/projects-screenshots/ctx/landing.svg",
    screenshots: ["/assets/projects-screenshots/ctx/landing.svg"],
    live: "https://github.com/Abhi190702/ctx",
    github: "https://github.com/Abhi190702/ctx",
    accent: "#a78bfa",
    summary:
      "Portable memory for AI workflows, built to keep context organized, reusable, and easy to carry across development sessions.",
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.node],
      backend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.node],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            ctx is a portable memory layer for AI-assisted work. It focuses on
            keeping useful context structured, reusable, and available when
            moving between tools, repos, or coding sessions.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "sony-landing",
    category: "Product Landing",
    title: "Sony Product Landing Page",
    src: "/assets/projects-screenshots/sony-landing/landing.png",
    screenshots: ["/assets/projects-screenshots/sony-landing/landing.png"],
    live: "https://github.com/Abhi190702/SONY-Product-landing-website",
    github: "https://github.com/Abhi190702/SONY-Product-landing-website",
    accent: "#e2e8f0",
    summary:
      "A premium Sony WH-1000XM6 product landing page built with Next.js, TypeScript, Tailwind CSS, GSAP, Lenis, and motion-heavy sections.",
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            A product-focused frontend build with premium motion, dense visual
            sections, and a polished landing-page structure for a flagship audio
            product.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "law-portfolio",
    category: "Client Portfolio",
    title: "Law Portfolio",
    src: "/assets/projects-screenshots/law-portfolio/landing.png",
    screenshots: ["/assets/projects-screenshots/law-portfolio/landing.png"],
    live: "https://github.com/Abhi190702/Law-Portfolio",
    github: "https://github.com/Abhi190702/Law-Portfolio",
    accent: "#7c3aed",
    summary:
      "A 3D law portfolio website built with GSAP, ScrollTrigger, and Vanilla JS for a clean professional brand presence.",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.css],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Law Portfolio presents a legal brand with motion, clarity, and a
            formal visual tone while keeping the structure straightforward for
            visitors.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
];

export default projects;
