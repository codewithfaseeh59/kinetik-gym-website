import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import ClassesBrowser from "@/sections/ClassesBrowser";
import ReadyBanner from "@/components/ui/ReadyBanner";
import Socials from "@/sections/Socials";

export const metadata: Metadata = {
  title: "Classes — KINETIK",
  description: "Power, flow, moves, aqua, ride and kids' classes taught by top instructors at every KINETIK club.",
};

export default function ClassesPage() {
  return (
    <>
      <PageHero
        tone="yellow"
        eyebrow="Group classes"
        sub="Let's start moving!"
        title="Classes"
        statement="From heavy barbells to slow yoga, there is a class for every goal and every level."
      >
        <Button href="/timetable" variant="dark">
          See the timetable
        </Button>
        <Button href="/form/schedule-visit" variant="outline">
          Try a free class
        </Button>
      </PageHero>
      <ClassesBrowser />
      <ReadyBanner text="Let's go" />
      <Socials />
    </>
  );
}
