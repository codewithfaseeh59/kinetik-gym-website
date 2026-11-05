import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import ClubCards from "@/sections/ClubCards";
import Socials from "@/sections/Socials";

export const metadata: Metadata = {
  title: "Clubs — KINETIK",
  description: "Five KINETIK clubs across Ashford, Brightwater, Crestview and Dunmore. Find yours.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHero
        eyebrow="KINETIK Clubs"
        sub="Ashford, Brightwater, Crestview & Dunmore"
        title="Clubs"
        statement="Step into a modern, welcoming space, guided by coaches who want you to reach your full potential."
      >
        <Button href="/form/schedule-visit" variant="yellow">
          Schedule a visit
        </Button>
        <Button href="/timetable" variant="outline">
          See the timetable
        </Button>
      </PageHero>
      <ClubCards />
      <Socials />
    </>
  );
}
