import { CodeLink } from "@/components/site/code-link";
import { Container } from "@/components/site/container";
import { Prompt } from "@/components/site/prompt";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Container>
      <section className="flex min-h-[60vh] flex-col items-start justify-center space-y-6">
        <Prompt path="404" />
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-5xl">
          <span className="text-muted-foreground">{">"} </span>
          page not found
        </h1>
        <p className="text-muted-foreground max-w-md font-mono text-sm">
          <span className="text-destructive">error:</span> route does not exist
          in this build. try going back home.
        </p>
        <CodeLink
          href="/"
          previewLabel="cd ~/"
          className={cn(buttonVariants(), "bg-brand hover:opacity-90")}
        >
          cd ~/
        </CodeLink>
      </section>
    </Container>
  );
}
