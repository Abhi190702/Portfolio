"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import Link from "next/link";
import { config } from "@/data/config";
import { Github, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative z-10 mx-auto min-h-screen max-w-7xl px-4 py-24 md:px-8">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          Contact
        </p>
        <Link href={"#contact"}>
          <h2 className="mt-3 font-display text-4xl font-semibold text-zinc-950 dark:text-white md:text-6xl">
            Let&apos;s Work Together
          </h2>
        </Link>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 md:text-base">
          Reach out for projects, collaboration, internship opportunities, or a
          quick chat about something worth building.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-zinc-200 bg-white/75 p-6 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="font-display text-xl font-semibold">Find me here</h3>
          <div className="mt-5 grid gap-3">
            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm transition hover:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:hover:border-white/25"
            >
              <Mail size={18} />
              {config.email}
            </a>
            <a
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm transition hover:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:hover:border-white/25"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm transition hover:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:hover:border-white/25"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
        <Card className="rounded-lg border-zinc-200 bg-white/75 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="font-display text-3xl">Contact Form</CardTitle>
            <CardDescription>
              Please contact me directly at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-gray-200 cursor-can-hover rounded-lg"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              or drop your info here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default ContactSection;
