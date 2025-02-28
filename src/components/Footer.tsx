import { GithubIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 mx-auto">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <a
            href="https://github.com/benborla"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary inline-flex items-center gap-1"
          >
            @benborla
            <GithubIcon className="h-3 w-3" />
          </a>
        </p>
      </div>
    </footer>
  );
} 