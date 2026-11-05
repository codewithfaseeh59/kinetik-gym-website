"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { cities, introCards, brand } from "@/data/content";
import SplitReveal from "@/components/ui/SplitReveal";
import Button from "@/components/ui/Button";
import styles from "./ClubsIntro.module.css";

export default function ClubsIntro() {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useMotion(() => {
    // the whole strip glides sideways while the section scrolls past
    gsap.to(track.current, {
      x: () => -Math.max(0, (track.current?.scrollWidth ?? 0) - (strip.current?.clientWidth ?? 0)),
      ease: "none",
      scrollTrigger: {
        trigger: strip.current,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    // cards rise in
    gsap.from("[data-card]", {
      y: 120,
      rotate: 6,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.07,
      scrollTrigger: { trigger: strip.current, start: "top 85%", once: true },
    });
  }, root);

  return (
    <section ref={root} id="clubs" className={styles.section} data-theme="light">
      <div className={styles.head}>
        <SplitReveal as="h2" className={styles.title}>
          {brand.name} has clubs located in {cities.slice(0, -1).join(", ")} and {cities[cities.length - 1]}. Get to know each one!
        </SplitReveal>
        <div className={styles.actions}>
          <Button href="/clubs" variant="dark">
            View all clubs
          </Button>
          <Button href="/form/schedule-visit" variant="outline">
            Schedule a visit
          </Button>
        </div>
      </div>

      <div ref={strip} className={styles.strip}>
        <ul ref={track} className={styles.track}>
          {introCards.map((src, i) => (
            <li key={src} className={styles.card} data-card="" data-i={i % 3}>
              <Image src={src} alt="" fill sizes="(max-width: 768px) 60vw, 24vw" className={styles.img} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
