import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GithubIcon } from "@/components/icons/GithubIcon";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-bold text-xl">Vibe Learning</span>
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
