/**
 * Single source of truth for all portfolio content.
 * Edit copy, links, projects, and experience here.
 */

import { SITE } from "@/content/site.mjs";

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "mail" | "globe";
};

export type Job = {
  slug: string;
  period: string;
  role: string;
  company: string;
  oneliner: string;
  summary: string;
  projects: { name: string; description: string }[];
  tech: string[];
};

/** Shipping status. Only Fairview products carry one. */
export type ProjectStatus = "live" | "beta" | "in-development";

/**
 * Long-form content for a project. Its presence is what generates a
 * `/project/<slug>` page. A project without `detail` renders as a card only.
 */
export type ProjectDetail = {
  summary: string;
  why: string;
  features: string[];
  highlights: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
  /** Fairview products only: short pitch, status pill, and pricing line. */
  tagline?: string;
  status?: ProjectStatus;
  pricing?: string;
  detail?: ProjectDetail;
};

/** A project that has a detail page. Narrow with `hasDetail`. */
export type DetailedProject = Project & { detail: ProjectDetail };

export function hasDetail(project: Project): project is DetailedProject {
  return project.detail !== undefined;
}

export type TechStack = Record<string, string[]>;

export const INFO = {
  main: SITE,

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/sufyanjami",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sufyanjami/",
      icon: "linkedin",
    },
    {
      label: "X",
      href: "https://x.com/sufyanbuilds",
      icon: "x",
    },
    {
      label: "Email",
      href: "mailto:sufijami9@gmail.com",
      icon: "mail",
    },
  ] satisfies SocialLink[],

  homepage: {
    /** One entry per rendered line. Layout no longer depends on punctuation. */
    headline: ["Full-stack software developer."],
    description:
      "I build software end to end, from the database to the interface. Right now, most of that happens alongside coding agents.",
  },

  about: {
    title: "I'm Sufyan Jami. I live in Calgary, AB, Canada.",
    /** One entry per rendered paragraph. */
    description: [
      "I work remotely from my home office, fuelled by coffee and genuine excitement about where software is headed.",
      "Over the past few years, I've grown a lot as a developer. Most of that time has been spent building complex systems. Somewhere along the way, AI agents became part of how I work and ship software. Building this way has been the most fun I've had in a very long time.",
      "I learn best by building real things, shipping them, seeing what breaks, and coming back with a better understanding. We're entering a new chapter of software, and I hope to contribute to it by continuing to build, learn, and stay open to change.",
    ],
  },

  fairview: {
    company: "Fairview Software",
    summary:
      "Products I've built and shipped on my own time.",
  },

  jobs: [
    {
      slug: "entergrade",
      period: "2023 to Present",
      role: "Full-Stack Developer",
      company: "Entergrade Solutions",
      oneliner: "Enterprise SaaS for Microsoft Teams telephony",
      summary:
        "Building enterprise SaaS products for the Microsoft Teams telephony space, working across frontend applications, backend APIs, shared infrastructure, and cloud services.",
      projects: [
        {
          name: "Shared Component Library",
          description:
            "SvelteKit library with Flowbite + custom components and Storybook docs.",
        },
        {
          name: "Flagship Portal Rebuild",
          description:
            "Frontend rebuild plus .NET/C# backend refactor (v1 → v2).",
        },
        {
          name: "Call Archiving Product",
          description: "Frontend + dedicated .NET/C# backend.",
        },
        {
          name: "Real-Time Queue Management",
          description: "End-to-end Teams queue product with live data sync.",
        },
        {
          name: "MSP Platform",
          description:
            "Multi-tenant management platform: frontend data mocking, backend APIs, integrations.",
        },
        {
          name: "Third-Party Integrations",
          description: "REST API integration for analytics and reporting.",
        },
        {
          name: "SOC2 Compliance",
          description: "Led SOC2 certification requirements company-wide.",
        },
      ],
      tech: [
        "SvelteKit",
        "TypeScript",
        "Tailwind CSS",
        "Flowbite",
        "Storybook",
        "C#",
        "ASP.NET Core",
        "Azure",
        "Azure DevOps",
        "Microsoft Teams APIs",
        "REST APIs",
        "SQL",
      ],
    },
    {
      slug: "cba",
      period: "2022 to 2023",
      role: "Web Developer",
      company: "Canadian Bar Association",
      oneliner: "Multi-province legal web platform",
      summary:
        "Managed a multi-province web ecosystem serving legal professionals across Canada.",
      projects: [
        {
          name: "Multi-Site Architecture",
          description:
            "13 provincial websites with unique content, jobs, and structures.",
        },
        {
          name: "CMS & Backend Development",
          description:
            "Kentico 13 CMS, .NET Core backend, custom page types and widgets.",
        },
        {
          name: "User Management",
          description: "Access control, permissions, roles.",
        },
      ],
      tech: [".NET Core", "C#", "Kentico 13", "MySQL", "HTML", "CSS", "JavaScript"],
    },
    {
      slug: "pbs",
      period: "2019 to 2022",
      role: "Tier 2 Forms Programmer",
      company: "PBS Systems",
      oneliner: "Document automation and internal tooling",
      summary:
        "Developed document automation systems for automotive dealership software, focusing on e-signature workflows and legacy printer compatibility.",
      projects: [
        {
          name: "Document Automation",
          description:
            "Custom programs converting dealership forms into e-signable documents with OKI legacy printer support.",
        },
        {
          name: "Internal Tooling",
          description: "Productivity applications for internal teams.",
        },
        {
          name: "Team Development",
          description: "Mentoring, code reviews, documentation.",
        },
      ],
      tech: ["Custom scripting", "Document processing", "Internal tooling"],
    },
    {
      slug: "allinone",
      period: "2018 to 2019",
      role: "Web Developer",
      company: "All-In-One Digital",
      oneliner: "Agency web development",
      summary:
        "Sole developer at a digital agency, running the web portfolio for every client.",
      projects: [
        {
          name: "Client Portfolio Management",
          description: "8+ WordPress sites with ongoing updates.",
        },
        {
          name: "New Client Builds",
          description: "WordPress + Divi from scratch.",
        },
        {
          name: "Redesigns & Migrations",
          description: "Complete redesigns with SEO continuity.",
        },
      ],
      tech: ["WordPress", "Divi", "HTML", "CSS", "JavaScript", "SEO"],
    },
  ] satisfies Job[],

  fairviewProjects: [
    {
      slug: "yt-transcriber",
      title: "YT Transcriber",
      tagline: "YouTube URLs in, transcripts out.",
      description:
        "Paste a YouTube link, get a transcript. Flat-rate pricing, no per-minute billing.",
      pricing: "$10 / month · 1000 transcriptions",
      status: "live",
      tech: ["TypeScript", "Whisper", "Cloud Functions", "Stripe"],
      live: "https://yt-transcriber.io/",
      detail: {
        summary:
          "Paste a YouTube link, get a transcript. Shipped and live at yt-transcriber.io under Fairview Software. Flat-rate subscription ($10/mo for 1000 transcriptions) instead of the per-minute model most transcription tools use.",
        why: "I wanted transcription pricing I could predict up front, one flat rate with no math per video. Building it also gave me an end-to-end SaaS surface to own: auth, billing, background jobs, deployment.",
        features: [
          "Paste a YouTube URL, get a full transcript",
          "Flat-rate pricing: $10/mo for 1000 transcriptions",
          "No per-minute billing",
          "Subscription management via Stripe",
        ],
        highlights: [
          "Whisper-powered transcription on cloud functions",
          "Stripe billing + webhook handling",
          "TypeScript end-to-end",
          "Live in production under Fairview Software",
        ],
      },
    },
    {
      slug: "fairview-sites",
      title: "Fairview Sites",
      tagline: "Form-to-website generator with an editor. Deploys on purchase.",
      description:
        "Fill out a form → site generated → checkout → auto-deployed. Includes an editor for changes after publish, no code needed.",
      status: "in-development",
      tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "Cloudflare"],
    },
  ] satisfies Project[],

  projects: [
    {
      slug: "mdtopdf",
      title: "Markdown to PDF",
      description:
        "Markdown to PDF converter that runs entirely in the browser. Edit Markdown, render GitHub Flavored Markdown, and export a clean PDF. Nothing leaves your machine.",
      tech: ["React", "TypeScript", "Tailwind CSS 4", "Vite", "pdfmake"],
      live: "https://mdtopdf-theta.vercel.app/",
      detail: {
        summary:
          "Load or paste Markdown, edit it in the browser, and export a clean PDF with no browser print headers or footers. Renders GitHub Flavored Markdown and sanitizes the HTML before preview. No backend and no upload path, so files stay local to the browser session.",
        why: "I kept wanting a fast way to turn Markdown into a properly formatted PDF without pasting it into an online converter or opening a full editor. Building it let me work with the unified, remark, and rehype pipeline and convert a Markdown AST directly into a pdfmake document definition, so the output is properly typeset rather than a capture of the print dialog.",
        features: [
          "Load .md and .markdown files",
          "Edit Markdown in the browser",
          "GitHub Flavored Markdown rendering",
          "Sanitized HTML preview",
          "Export to PDF with no print headers or footers",
          "Files stay local to the browser session",
        ],
        highlights: [
          "unified + remark parse Markdown to an AST",
          "rehype sanitizes and serializes the preview HTML",
          "Markdown AST converted into a pdfmake document definition",
          "No backend, no upload path",
          "Tailwind CSS 4 with local reusable UI primitives",
        ],
      },
    },
    {
      slug: "json-type-generator",
      title: "JSON Type Generator",
      description:
        "Browser-based tool that converts JSON to TypeScript interfaces or C# classes in real time.",
      tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "Vitest"],
      live: "https://json2types.vercel.app/",
      repo: "https://github.com/sufyanjami/json2types",
      detail: {
        summary:
          "Paste JSON on the left, get typed code on the right. No server, no dependencies beyond the build toolchain.",
        why: "I convert API responses into typed interfaces constantly, and I wanted that to work offline in a tab I already had open. Keeping it client-side meant most of the work went into type inference: unifying mixed arrays, telling ints from floats, and handling reserved keywords.",
        features: [
          "Real-time JSON → TS / C# conversion",
          "Editable output",
          "Format JSON",
          "Upload .json file",
          "Download (.ts / .cs)",
          "Copy to clipboard",
        ],
        highlights: [
          "Smart type unification",
          "int vs float distinction",
          "Mixed array handling",
          "Edge cases: reserved keywords, invalid names, deep nesting",
          "51 unit tests",
        ],
      },
    },
  ] satisfies Project[],

  techStack: {
    Languages: ["TypeScript", "C#", "Rust", "JavaScript", "SQL"],
    Frontend: ["SvelteKit", "React", "Next.js", "Tailwind CSS", "Storybook"],
    Backend: ["ASP.NET Core", ".NET", "MySQL", "Kentico"],
    "Cloud & DevOps": ["Azure", "Cloudflare", "Azure DevOps", "Vercel", "CI/CD"],
  } satisfies TechStack,
};

/** Every project, Fairview products included. */
export const ALL_PROJECTS: Project[] = [
  ...INFO.projects,
  ...INFO.fairviewProjects,
];

/** Projects with long-form content: exactly the set that gets a detail page. */
export const DETAILED_PROJECTS: DetailedProject[] =
  ALL_PROJECTS.filter(hasDetail);
