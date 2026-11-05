import Hero from "@/sections/Hero";
import ClubsIntro from "@/sections/ClubsIntro";
import Facilities from "@/sections/Facilities";
import FitnessStrong from "@/sections/FitnessStrong";
import Classes from "@/sections/Classes";
import AppPromo from "@/sections/AppPromo";
import Socials from "@/sections/Socials";
import ClubsList from "@/sections/ClubsList";

export default function Home() {
  return (
    <>
      <Hero />
      <ClubsIntro />
      <Facilities />
      <FitnessStrong />
      <Classes />
      <AppPromo />
      <Socials />
      <ClubsList />
    </>
  );
}
