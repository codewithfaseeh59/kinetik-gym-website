import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import TimetableApp from "@/sections/TimetableApp";
import Socials from "@/sections/Socials";

export const metadata: Metadata = {
  title: "Timetable — KINETIK",
  description: "Pick a club and a day to see every class, instructor and free spot.",
};

export default function TimetablePage() {
  return (
    <>
      <PageHero compact title="Timetable" sub="It's time for some action" eyebrow="Weekly classes" />
      {/* useSearchParams needs a Suspense boundary in a static export */}
      <Suspense fallback={<div style={{ minHeight: "70svh" }} />}>
        <TimetableApp />
      </Suspense>
      <Socials />
    </>
  );
}
