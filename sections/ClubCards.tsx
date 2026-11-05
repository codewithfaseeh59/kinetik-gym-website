"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { clubs } from "@/data/content";
import ParallaxImage from "@/components/ui/ParallaxImage";
import SplitReveal from "@/components/ui/SplitReveal";
import Button from "@/components/ui/Button";
import styles from "./ClubCards.module.css";

/** Big alternating club showcase used on /clubs. */
export default function ClubCards() {
  const root = useRef<HTMLElement>(null);

  useMotion(() => {
    gsap.utils.toArray<HTMLElement>("[data-info]").forEach((el) => {
      gsap.from(el.children, {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    });
  }, root);

  return (
    <section ref={root} className={styles.section} data-theme="dark">
      {clubs.map((c, i) => (
        <article key={c.slug} className={`${styles.club} ${i % 2 ? styles.flip : ""}`}>
          <div className={styles.media}>
            <ParallaxImage src={c.image} alt={`${c.name} in ${c.city}`} sizes="(max-width: 900px) 100vw, 55vw" reveal />
          </div>
          <div className={styles.info} data-info="">
            <p className={styles.chip}>
              {c.type} · {c.city}
            </p>
            <SplitReveal as="h2" className={`${styles.name} display`}>
              {c.name}
            </SplitReveal>
            <p className={styles.tag}>{c.tagline}</p>
            <ul className={styles.perks}>
              {c.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className={styles.actions}>
              <Button href={`/clubs/${c.slug}`} variant="yellow">
                Explore club
              </Button>
              <Button href="/form/schedule-visit" variant="outline">
                Schedule a visit
              </Button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
