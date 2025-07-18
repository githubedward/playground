import { GithubIcon } from "@/components/icons/github-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  E
                </span>
              </div>
              <Text variant="lead" weight="bold">
                Ed&apos;s playground
              </Text>
            </Link>
          </div>

          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="icon">
              <GithubIcon className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
