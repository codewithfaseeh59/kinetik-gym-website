import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageHero
      tone="yellow"
      eyebrow="Error 404"
      sub="This page skipped leg day."
      title="Not found"
      statement="The page you're looking for doesn't exist or has moved."
    >
      <Button href="/" variant="dark">
        Back home
      </Button>
      <Button href="/clubs" variant="outline">
        Find a club
      </Button>
    </PageHero>
  );
}
