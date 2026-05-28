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
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";

const ProjectsLinks = ({
  live,
  repo,
}: {
  live: string;
  repo?: string;
}) => {
  return (
    <div className="my-6 flex flex-col items-center justify-start gap-3 md:flex-row">
      <Link
        className="flex gap-2 font-mono underline"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant="default" size="sm">
          View Project
          <ArrowUpRight className="ml-3 h-5 w-5" />
        </Button>
      </Link>
      {repo && repo !== live ? (
        <Link
          className="flex gap-2 font-mono underline"
          rel="noopener"
          target="_new"
          href={repo}
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
  three: skill("Three.js", <SiThreedotjs />),
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
    category: "DevOps / CLI Tool",
    title: "DeploySense",
    src: "/assets/projects-screenshots/deploy-sense/landing.png",
    screenshots: ["/assets/projects-screenshots/deploy-sense/landing.png"],
    live: "https://deploy-sense-web.vercel.app/",
    github: "https://github.com/Abhi190702/DeploySense",
    accent: "#f97316",
    summary:
      "Open-source DevOps intelligence CLI. Scans Dockerfiles, Kubernetes, GitHub Actions & Compose configs before deployments break production. Returns health scores, risk analysis, and auto-fixes.",
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.docker, PROJECT_SKILLS.kubernetes],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            DeploySense is an open-source DevOps intelligence CLI that catches
            deployment mistakes before they wake you up at 3 AM. It scans
            Dockerfiles, GitHub Actions workflows, Kubernetes manifests, Docker
            Compose files, and deployment logs — returning health scores, risk
            categories, plain-English explanations, and copy-paste fixes. Ships
            with 54+ rules across 5 scanners and a live web dashboard.
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
    live: "https://github.com/Abhi190702/GhostGate.git",
    github: "https://github.com/Abhi190702/GhostGate.git",
    accent: "#00d4ff",
    summary:
      "A cybersecurity-focused project centered on ethical reconnaissance, defensive awareness, and practical security tooling.",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.react],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.python],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            GhostGate represents Abhijeet&apos;s cybersecurity interest: dark,
            technical, and built around practical awareness of how systems
            behave under inspection.
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
    live: "https://github.com/Abhi190702/Law-Portfolio.git",
    github: "https://github.com/Abhi190702/Law-Portfolio.git",
    accent: "#7c3aed",
    summary:
      "A professional portfolio site for a law-focused brand, emphasizing trust, clarity, and responsive presentation.",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            Law Portfolio is a focused professional site with clean page
            structure, simple navigation, and polished presentation for a legal
            service audience.
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
    live: "https://github.com/Abhi190702/SONY-Product-landing-website.git",
    github: "https://github.com/Abhi190702/SONY-Product-landing-website.git",
    accent: "#e2e8f0",
    summary:
      "A polished product landing page concept with a premium visual direction and clean frontend execution.",
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.js, PROJECT_SKILLS.css],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            A product-focused frontend build for a Sony-style landing page,
            included here as one of the three highlighted works in the room.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
];

export default projects;
