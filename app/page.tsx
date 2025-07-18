import { Container } from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/components/typography";

export default function Home() {
  return (
    <Container className="container mx-auto min-h-screen bg-background pt-16">
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
          Hi, I&apos;m Edward
        </Heading>

        {/* Section 3: Sub-heading */}
        <Heading
          size="h2"
          variant="muted"
          weight="medium"
          className="text-center mb-8"
        >
          Learning in public, one post at a time
        </Heading>

        {/* Section 4: Description */}
        <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed max-w-lg mx-auto">
          Welcome to my digital learning lab. I&apos;m documenting my journey
          through technology.
        </p>
      </div>
    </Container>
  );
}
