import { Container } from "@/components/container";
import { Navigation } from "@/components/navigation";
import { Heading } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNavigationRoutes } from "@/lib/routes-data";

export default function Home() {
  const routes = getNavigationRoutes();

  return (
    <Container className="container mx-auto min-h-screen bg-background py-16">
      {/* Section 1: Avatar */}
      <div className="flex justify-center mb-8">
        <Avatar className="w-30 h-30 border-2 border-border">
          <AvatarImage
            src="profile-mini.jpg"
            alt="Edward"
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-bold">E</AvatarFallback>
        </Avatar>
      </div>

      <div>
        {/* Section 2: Intro */}
        <Heading
          size="h1"
          variant="default"
          weight="bold"
          className="text-center mb-4"
        >
          Hi, I&apos;m Edward 👋
        </Heading>

        {/* Section 3: Sub-heading */}
        <Heading
          size="h3"
          as="h2"
          variant="muted"
          weight="medium"
          className="text-center mb-8"
        >
          Learning in public, one post at a time
        </Heading>

        {/* Section 4: Description */}
        <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed max-w-lg mx-auto">
          Welcome to my digital learning lab. I&apos;m documenting my journey
          through technology starting from frontend fundamentals.
        </p>

        {/* Section 5: Dynamic Navigation */}
        <Navigation routes={routes} />
      </div>
    </Container>
  );
}
