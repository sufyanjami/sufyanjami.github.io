import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { Prompt } from "@/components/site/prompt";
import { Socials } from "@/components/site/socials";
import { WindowFrame } from "@/components/site/window-frame";
import { INFO } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${INFO.main.name}.`,
};

export default function ContactPage() {
  return (
    <Container>
      <section className="space-y-6 py-16">
        <Prompt path="contact" />
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Ways to connect
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Open to new work, collaborations, and conversations about software
          and products. The fastest way to reach me is email.
        </p>

        <Socials variant="labelled" className="flex-wrap gap-3" />

        <WindowFrame
          title="sufyan@portfolio: ~/contact"
          bodyClassName="text-muted-foreground bg-card/40 p-4 text-xs"
        >
          <p>
            <span className="text-brand">$</span> echo $LOCATION
          </p>
          <p className="text-foreground pl-4">{INFO.main.location}</p>
          <p className="mt-3">
            <span className="text-brand">$</span> echo $EMAIL
          </p>
          <p className="text-foreground pl-4">{INFO.main.email}</p>
        </WindowFrame>
      </section>
    </Container>
  );
}
