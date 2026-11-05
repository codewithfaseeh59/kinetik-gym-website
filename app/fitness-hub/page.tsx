import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import ReadyBanner from "@/components/ui/ReadyBanner";
import ServiceBlocks from "@/sections/ServiceBlocks";
import Socials from "@/sections/Socials";

export const metadata: Metadata = {
  title: "Fitness Hub — KINETIK",
  description: "Coaching, physiotherapy, nutrition and Pilates under one roof. We help you reach and unlock your potential.",
};

export default function FitnessHubPage() {
  return (
    <>
      <PageHero
        eyebrow="All about fitness"
        sub="Coach · Physio · Nutri · Pilates"
        title="Fitness Hub"
        statement="We help you reach and unlock your potential, with a team that plans, treats, feeds and trains you."
      >
        <Button href="/form/know-more" variant="yellow">
          Know more
        </Button>
        <Button href="#coach" variant="outline">
          Explore services
        </Button>
      </PageHero>
      <ServiceBlocks />
      <ReadyBanner text="Your plan starts here" sub="Book an assessment and meet the team." />
      <Socials />
    </>
  );
}
