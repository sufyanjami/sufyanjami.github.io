const INFO = {
	main: {
		title: "Sufyan Jami Portfolio",
		name: "Sufyan Jami",
		email: "sufijami9@gmail.com",
		logo: "../logo.png",
	},

	socials: {
		github: "https://github.com/sufyanjami",
		linkedin: "https://www.linkedin.com/in/sufyanjami/",
	},

	homepage: {
		title: "Full Stack Developer with a focus on enterprise SaaS.",
		description:
			"I've rebuilt flagship products, architected shared component libraries, and delivered features across frontend, backend, and cloud infrastructure. I work wherever the problem needs solving.",
	},

	about: {
		title: "I'm Sufyan Jami. I live in Edmonton, AB Canada.",
		description:
			"Based in Edmonton, AB. Working remotely building enterprise software. Background spans agency work, document automation systems, multi-province web platforms, and SaaS products. I like solving complex problems and shipping software that handles real volume.",
	},

	jobs: [
		{
			slug: "entergrade",
			company: "Entergrade Solutions",
			role: "Full Stack Developer",
			period: "2023–Present",
			oneliner: "Enterprise SaaS for Microsoft Teams telephony",
			duration: "Dec 2023 – Present",
			summary:
				"Building enterprise SaaS products for the Microsoft Teams telephony space, working across frontend applications, backend APIs, shared infrastructure, and cloud services.",
			projects: [
				{
					title: "Shared Component Library",
					description:
						"Architected and built a reusable SvelteKit component library serving as the foundation for multiple product frontends. Combined Flowbite components with custom-built components tailored to specific business requirements. Documented with Storybook for team-wide adoption.",
				},
				{
					title: "Flagship Portal Rebuild",
					description:
						"Led the complete rebuild of the company's primary product from v1 to v2. Rebuilt the frontend using the shared component library and refactored the .NET/C# backend that handles core business logic. This product serves the majority of company revenue.",
				},
				{
					title: "Call Archiving Product",
					description:
						"Built the frontend for an archiving product using the shared component library, integrating with a dedicated .NET/C# backend. Used by the majority of the company's customer base.",
				},
				{
					title: "Real-Time Queue Management",
					description:
						"Developed a real-time Teams queue management product end-to-end. Built the complete frontend and implemented all backend logic, including live data synchronization for queue monitoring.",
				},
				{
					title: "MSP Platform",
					description:
						"Currently building a multi-tenant MSP management platform. Developed the frontend with standalone data mocking for independent iteration, then built the corresponding backend APIs. This system integrates with multiple backend services including a carrier module and purchasing/provisioning workflows.",
				},
				{
					title: "Third-Party Integrations",
					description:
						"Integrated external REST APIs for analytics and reporting. Handled ongoing support, debugging, and log analysis for production issues.",
				},
				{
					title: "SOC2 Compliance",
					description:
						"Drove the technical requirements for SOC2 certification, implementing necessary changes across the monorepo to achieve compliance.",
				},
			],
			tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "Flowbite", "Storybook", "C#", "ASP.NET Core", "Azure", "Azure DevOps", "Microsoft Teams APIs", "REST APIs", "SQL"],
		},
		{
			slug: "cba",
			company: "Canadian Bar Association",
			role: "Web Developer",
			period: "2022–2023",
			oneliner: "Multi-province legal web platform",
			duration: "Dec 2022 – Dec 2023",
			summary:
				"Managed and developed a multi-province web ecosystem serving legal professionals across Canada.",
			projects: [
				{
					title: "Multi-Site Architecture",
					description:
						"Maintained 13 provincial websites, each with unique content, job boards, and page structures tailored to regional requirements. Coordinated changes across all properties to ensure consistency while respecting provincial customizations.",
				},
				{
					title: "CMS & Backend Development",
					description:
						"Worked within a Kentico CMS legacy system with a .NET Core backend. Built custom page types and widgets based on feature requirements gathered in weekly stakeholder meetings.",
				},
				{
					title: "User Management",
					description:
						"Administered user access control across all applications, managing permissions and roles for internal teams and members.",
				},
			],
			tech: [".NET Core", "C#", "Kentico 13", "MySQL", "HTML", "CSS", "JavaScript"],
		},
		{
			slug: "pbs",
			company: "PBS Systems",
			role: "Tier 2 Forms Programmer",
			period: "2019–2022",
			oneliner: "Document automation and internal tooling",
			duration: "Apr 2019 – Dec 2022",
			summary:
				"Developed document automation systems for automotive dealership software, focusing on e-signature workflows and legacy printer compatibility.",
			projects: [
				{
					title: "Document Automation",
					description:
						"Built custom programs to convert dealership forms into e-signable documents, handling the logic for digital signature workflows and compatibility with OKI legacy printers used by banks and dealerships for financing documents.",
				},
				{
					title: "Internal Tooling",
					description:
						"Created productivity applications and systems within the department to streamline processes and improve team efficiency.",
				},
				{
					title: "Team Development",
					description:
						"Mentored junior programmers through training and code reviews. Authored process documentation to onboard new hires and standardize workflows.",
				},
			],
			tech: ["Custom scripting", "Document processing", "Internal tooling"],
		},
		{
			slug: "allinone",
			company: "All-In-One Digital",
			role: "Web Developer",
			period: "2018–2019",
			oneliner: "Agency web development",
			duration: "Dec 2018 – Apr 2019",
			summary:
				"Sole developer at a digital agency, managing the complete web portfolio for all clients.",
			projects: [
				{
					title: "Client Portfolio Management",
					description:
						"Maintained and updated 8+ WordPress websites, handling ongoing changes, feature requests, and content updates across the entire client base.",
				},
				{
					title: "New Client Builds",
					description:
						"Built new websites from scratch for incoming clients using WordPress and Divi, working from design requirements through to deployment.",
				},
				{
					title: "Redesigns & Migrations",
					description:
						"Executed complete website redesigns for existing clients, balancing fresh designs with content preservation and SEO continuity.",
				},
			],
			tech: ["WordPress", "Divi", "HTML", "CSS", "JavaScript", "SEO"],
		},
	],

	projects: [
		{
			slug: "json-type-generator",
			title: "JSON Type Generator",
			description: "A browser-based tool that converts JSON to TypeScript interfaces or C# classes in real-time.",
			tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "Vitest"],
			link: "https://json2types.vercel.app/",
			github: "https://github.com/sufyanjami/json2types",
			image: null, // TODO: Add screenshot
			summary: "Paste JSON on the left, get typed code on the right. No server, no dependencies beyond the build toolchain.",
			features: [
				"Real-time conversion - Output updates as you type",
				"Editable output - Fine-tune generated code before copying",
				"Format JSON - Auto-prettify messy or minified JSON",
				"Upload JSON file - Load .json files directly",
				"Download output - Save generated code as .ts or .cs file",
				"Copy to clipboard - One-click copy",
			],
			why: "I built this because I frequently need to convert API responses into typed interfaces. Existing tools were either slow, required a server, or didn't handle edge cases well. This solves that with pure client-side code and smart type inference.",
			highlights: [
				"Smart type unification - merges properties from array objects",
				"Distinguishes int vs float, handles mixed arrays gracefully",
				"Handles edge cases: reserved keywords, invalid property names, deeply nested structures",
				"51 unit tests covering type inference and code generation",
			],
		},
		{
			slug: "finance-simulator",
			title: "Finance Simulator",
			description: "A personal finance projection tool that visualizes your path to wealth with compound growth calculations.",
			tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "LayerCake"],
			link: "https://finance-simulator-silk.vercel.app/",
			github: "https://github.com/sufyanjami/finance-simulator",
			image: null, // TODO: Add screenshot
			summary: "Enter your current savings, income, and expenses. See 30-year projections, milestone timelines, and what-if scenarios. All calculations run locally in your browser.",
			features: [
				"30-year projections of net worth with compound interest",
				"Milestone tracking for $100k, $500k, $1M, and Financial Independence",
				"What-if slider to see impact of saving extra each month",
				"Return rate presets: Conservative (5%), Moderate (7%), Aggressive (10%)",
				"Auto-save with localStorage persistence",
				"Interactive growth chart visualization",
			],
			why: "I wanted a simple tool to visualize compound growth and experiment with different savings scenarios. Most finance calculators are either too basic or bloated with ads. This runs entirely client-side with zero API calls.",
			highlights: [
				"Future value calculations with monthly contributions",
				"Time-to-target solver for milestone projections",
				"Financial Independence number based on 4% safe withdrawal rate",
				"Handles edge cases: negative savings rate, unreachable milestones, rate caps",
			],
		},
		{
			slug: "markdown-notes",
			title: "Markdown Notes",
			description: "A client-side markdown note-taking app with live preview, folder organization, and export to PDF.",
			tech: ["SvelteKit 5", "TypeScript", "Tailwind CSS", "IndexedDB"],
			link: "https://note-down-ruddy.vercel.app/",
			github: "https://github.com/sufyanjami/NoteDown",
			image: null, // TODO: Add screenshot
			summary: "Create, organize, and export markdown notes entirely in your browser. Features live preview, folder hierarchy, search, and offline persistence via IndexedDB.",
			features: [
				"Live markdown preview side-by-side with editor",
				"Folder organization for grouping related notes",
				"Search across all notes by title and content",
				"Export individual notes to .md or PDF",
				"Keyboard shortcuts for power users",
				"Offline-first with IndexedDB persistence",
			],
			why: "I wanted a fast, offline-capable notes app without account requirements. Most note apps are either too heavy or require cloud sync. This runs entirely client-side with all data stored in IndexedDB.",
			highlights: [
				"Svelte 5 runes for reactive state management",
				"IndexedDB via idb wrapper for Promise-based persistence",
				"PDF generation with jsPDF including text wrapping and pagination",
				"Hierarchical folder structure with uncategorized notes support",
			],
		},
	],

	techStack: {
		frontend: ["SvelteKit", "TypeScript", "React", "Tailwind CSS", "Flowbite", "Storybook"],
		backend: ["C#", "ASP.NET Core", ".NET Core", "REST APIs", "SQL", "MySQL"],
		cloud: ["Azure", "Azure DevOps", "CI/CD Pipelines"],
		cms: ["Kentico", "WordPress"],
		integrations: ["Microsoft Teams", "Third-Party APIs"],
		tools: ["Git", "Jira", "Monorepo Architecture"],
	},
};

export default INFO;
