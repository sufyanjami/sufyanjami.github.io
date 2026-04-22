import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { Prompt } from "@/components/site/prompt";
import { Socials } from "@/components/site/socials";
import { INFO } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${INFO.main.name}.`,
};

export default function ContactPage() {
  return (
    <Container>
      <section className="space-y-8 py-20">
        <Prompt path="contact" />
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Ways to connect
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Open to interesting work, collaborations, and conversations about
          software, products, or starting things. The fastest way to reach me
          is email.
        </p>

        <Socials variant="labelled" className="flex-wrap gap-3" />

        <div className="border-border text-muted-foreground rounded-sm border p-4 font-mono text-xs">
          <p>
            <span className="text-brand">$</span> echo $LOCATION
          </p>
          <p className="text-foreground pl-4">{INFO.main.location}</p>
          <p className="mt-3">
            <span className="text-brand">$</span> echo $EMAIL
          </p>
          <p className="text-foreground pl-4">{INFO.main.email}</p>
        </div>
      </section>
    </Container>
  );
}
