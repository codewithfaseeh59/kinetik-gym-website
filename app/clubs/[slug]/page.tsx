import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clubs, getClub } from "@/data/content";
import ClubDetail from "@/sections/ClubDetail";
import ReadyBanner from "@/components/ui/ReadyBanner";
import ClubsList from "@/sections/ClubsList";
import Socials from "@/sections/Socials";

export const dynamicParams = false;

export function generateStaticParams() {
  return clubs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const club = getClub(slug);
  return club
    ? { title: `${club.name} — ${club.city} — KINETIK`, description: `${club.tagline}. ${club.blurb}` }
    : {};
}

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) notFound();

  return (
    <>
      <ClubDetail club={club} />
      <ReadyBanner text={`${club.city} is ready`} />
      <ClubsList title="Other clubs" exclude={club.slug} />
      <Socials />
    </>
  );
}
