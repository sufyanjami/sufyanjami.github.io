/**
 * Single source of truth for all portfolio content.
 * Edit copy, links, projects, and experience here.
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "globe";
};

export type FairviewProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  pricing?: string;
  status: "live" | "beta" | "in-development";
  href?: string;
  tech: string[];
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

export type Project = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  why: string;
  features: string[];
  highlights: string[];
  tech: string[];
  live?: string;
  repo?: string;
};

export type TechStack = Record<string, string[]>;

export const INFO = {
  main: {
    name: "Sufyan Jami",
    title: "Full Stack Developer & Founder",
    email: "sufijami9@gmail.com",
    location: "Edmonton, AB Canada",
    resume: "/resume.pdf",
  },

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
      label: "Email",
      href: "mailto:sufijami9@gmail.com",
      icon: "mail",
    },
  ] satisfies SocialLink[],

  homepage: {
    headline: "Full-stack engineer. Mostly SaaS.",
    description:
      "TypeScript, SvelteKit, .NET, Azure. Currently at Entergrade shipping enterprise SaaS for Microsoft Teams telephony, and building products at Fairview Software.",
  },

  about: {
    title: "I'm Sufyan Jami. I live in Edmonton, AB Canada.",
    description:
      "Based in Edmonton, AB. Working remotely building enterprise software and running Fairview Software. Background spans agency work, document automation systems, multi-province web platforms, and SaaS products. I like solving complex problems and shipping software that handles real volume.",
  },

  fairview: {
    company: "Fairview Software",
    role: "Founder",
    summary:
      "A small product company I run on the side. Ships when ready, no roadmap theater.",
    products: [
      {
        slug: "fairview-sites",
        name: "Fairview Sites",
        tagline: "Form-to-website generator with an editor. Deploys on purchase.",
        description:
          "Fill out a form → site generated → checkout → auto-deployed. Includes an editor for changes after publish, no code needed.",
        status: "in-development",
        tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "Cloud Deploy"],
      },
      {
        slug: "yt-transcriber",
        name: "YT Transcriber",
        tagline: "YouTube URLs in, transcripts out.",
        description:
          "Paste a YouTube link, get a transcript. Flat-rate pricing — no per-minute nickel-and-diming.",
        pricing: "$10 / month · 1000 transcriptions",
        status: "live",
        href: "https://yt-transcriber.io/",
        tech: ["TypeScript", "Whisper", "Cloud Functions"],
      },
    ] satisfies FairviewProduct[],
  },

  jobs: [
    {
      slug: "entergrade",
      period: "2023 — Present",
      role: "Full Stack Developer",
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
          description: "Drove SOC2 certification requirements across the org.",
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
      period: "2022 — 2023",
      role: "Web Developer",
      company: "Canadian Bar Association",
      oneliner: "Multi-province legal web platform",
      summary:
        "Managed and developed a multi-province web ecosystem serving legal professionals across Canada.",
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
      period: "2019 — 2022",
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
      period: "2018 — 2019",
      role: "Web Developer",
      company: "All-In-One Digital",
      oneliner: "Agency web development",
      summary:
        "Sole developer at a digital agency, managing the complete web portfolio for all clients.",
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

  projects: [
    {
      slug: "billionaire-tracker",
      title: "BillionaireTracker",
      description:
        "Real-time billionaire tracking app pulling live data from the Forbes Real-Time Billionaires API.",
      summary:
        "Explore the world's billionaires with real-time net worth data, daily movers, country/industry filters, and detailed profile pages. Server-rendered for fast loads with no client-side fetch waterfalls.",
      why: "I wanted to build something with real external API integration and server-side rendering. This project let me practice Result-type error handling, pre-computed sorting for large datasets, and Svelte 5 runes.",
      features: [
        "Real-time net worth data",
        "Daily movers leaderboard",
        "Filters: country, industry, women, self-made",
        "Paginated leaderboard with 3000+ entries",
        "Expandable table rows",
        "Detailed profile pages",
      ],
      highlights: [
        "Server-side data loading",
        "Pre-computed sort arrays for performance",
        "Result type pattern for error handling",
        "Svelte 5 runes",
      ],
      tech: ["SvelteKit 2", "Svelte 5", "TypeScript", "Tailwind CSS 4"],
      live: "https://billtracker-seven.vercel.app/",
      repo: "https://github.com/sufyanjami/billtracker",
    },
    {
      slug: "json-type-generator",
      title: "JSON Type Generator",
      description:
        "Browser-based tool that converts JSON to TypeScript interfaces or C# classes in real-time.",
      summary:
        "Paste JSON on the left, get typed code on the right. No server, no dependencies beyond the build toolchain.",
      why: "I built this because I frequently need to convert API responses into typed interfaces. Existing tools were either slow, required a server, or didn't handle edge cases well. This solves that with pure client-side code and smart type inference.",
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
      tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "Vitest"],
      live: "https://json2types.vercel.app/",
      repo: "https://github.com/sufyanjami/json2types",
    },
    {
      slug: "finance-simulator",
      title: "Finance Simulator",
      description:
        "Personal finance projection tool that visualizes your path to wealth with compound growth calculations.",
      summary:
        "Enter your current savings, income, and expenses. See 30-year projections, milestone timelines, and what-if scenarios. All calculations run locally in your browser.",
      why: "I wanted a simple tool to visualize compound growth and experiment with different savings scenarios. Most finance calculators are either too basic or bloated with ads. This runs entirely client-side with zero API calls.",
      features: [
        "30-year projections",
        "Milestone tracking ($100k / $500k / $1M / FI)",
        "What-if slider",
        "Return rate presets (5% / 7% / 10%)",
        "localStorage persistence",
        "Interactive charts",
      ],
      highlights: [
        "Future value calculations",
        "Time-to-target solver",
        "FI number (4% rule)",
        "Edge cases: negative savings, unreachable targets",
      ],
      tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "LayerCake"],
      live: "https://finance-simulator-silk.vercel.app/",
      repo: "https://github.com/sufyanjami/finance-simulator",
    },
    {
      slug: "markdown-notes",
      title: "Markdown Notes",
      description:
        "Client-side markdown note-taking app with live preview, folder organization, and PDF export.",
      summary:
        "Create, organize, and export markdown notes entirely in your browser. Features live preview, folder hierarchy, search, and offline persistence via IndexedDB.",
      why: "I wanted a fast, offline-capable notes app without account requirements. Most note apps are either too heavy or require cloud sync. This runs entirely client-side with all data stored in IndexedDB.",
      features: [
        "Live preview",
        "Folder organization",
        "Search",
        "Export (.md / PDF)",
        "Keyboard shortcuts",
        "IndexedDB persistence",
      ],
      highlights: [
        "Svelte 5 runes",
        "IndexedDB via idb wrapper",
        "PDF generation with jsPDF",
        "Hierarchical folders",
      ],
      tech: ["SvelteKit 5", "TypeScript", "Tailwind CSS", "IndexedDB"],
      live: "https://note-down-ruddy.vercel.app/",
      repo: "https://github.com/sufyanjami/NoteDown",
    },
  ] satisfies Project[],

  techStack: {
    Frontend: ["SvelteKit", "TypeScript", "React", "Next.js", "Tailwind CSS", "Flowbite", "Storybook"],
    Backend: ["C#", "ASP.NET Core", ".NET Core", "REST APIs", "SQL", "MySQL"],
    "Cloud & DevOps": ["Azure", "Azure DevOps", "Vercel", "CI/CD Pipelines"],
    "CMS & Legacy": ["Kentico", "WordPress"],
    Integrations: ["Microsoft Teams", "Third-Party APIs"],
    Tools: ["Git", "Jira", "Monorepo Architecture"],
  } satisfies TechStack,
};
