import { Mail, Globe, type LucideIcon } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { CodeLink } from "@/components/site/code-link";
import { INFO, type SocialLink } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type IconComponent =
  | LucideIcon
  | ((props: { className?: string }) => React.JSX.Element);

const ICONS: Record<SocialLink["icon"], IconComponent> = {
  github: GithubIcon as IconComponent,
  linkedin: LinkedinIcon as IconComponent,
  mail: Mail,
  globe: Globe,
};

export function Socials({
  className,
  variant = "icon",
}: {
  className?: string;
  variant?: "icon" | "labelled";
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {INFO.socials.map((s) => (
        <li key={s.href}>
          <SocialItem social={s} variant={variant} />
        </li>
      ))}
    </ul>
  );
}

function SocialItem({
  social,
  variant,
}: {
  social: SocialLink;
  variant: "icon" | "labelled";
}) {
  const Icon = ICONS[social.icon];
  const isExternal = social.href.startsWith("http");

  return (
    <CodeLink
      href={social.href}
      external={isExternal}
      previewLabel={social.label.toLowerCase()}
      ariaLabel={social.label}
      className="border-border text-muted-foreground hover:text-brand hover:border-brand inline-flex items-center gap-2 rounded-sm border px-3 py-2 font-mono text-xs transition-colors"
    >
      <Icon className="size-3.5" />
      {variant === "labelled" && <span>{social.label}</span>}
    </CodeLink>
  );
}
