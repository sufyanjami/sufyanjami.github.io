import Link from "next/link";

import { Container } from "@/components/site/container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t">
      <Container className="flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <div className="text-muted-foreground font-mono text-xs">
          <span className="text-brand">$</span> built by{" "}
          <span className="text-foreground">Sufyan Jami</span> · &copy; {year}
        </div>
        <nav className="flex items-center gap-4 font-mono text-xs">
          <Link href="/" className="text-muted-foreground hover:text-brand">
            home
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-brand">
            about
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-brand">
            contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
