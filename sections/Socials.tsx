"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { socials } from "@/data/content";
import SplitReveal from "@/components/ui/SplitReveal";
import CircleButton from "@/components/ui/CircleButton";
import styles from "./Socials.module.css";

export default function Socials() {
  const root = useRef<HTMLElement>(null);

  useMotion(() => {
    gsap.from("[data-tile]", {
      y: 100,
      autoAlpha: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "[data-grid]", start: "top 80%", once: true },
    });
  }, root);

  return (
    <section ref={root} id="social" className={styles.section} data-theme="light">
      <SplitReveal as="h2" className={`${styles.title} display`}>
        Keep up with all the latest on our socials!
      </SplitReveal>

      <div className={styles.grid} data-grid="">
        {socials.map((s) => (
          <article key={s.name} className={styles.tile} data-tile="" data-tone={s.tone}>
            <header className={styles.top}>
              <div>
                <h3 className={`${styles.name} display`}>{s.name}</h3>
                <p className={styles.handle}>{s.handle}</p>
              </div>
              <CircleButton label={`Open ${s.name}`} className={styles.circle} />
            </header>
            <div className={styles.photos}>
              {s.images.map((src, i) => (
                <div key={src} className={styles.photo} style={{ transitionDelay: `${i * 40}ms` }}>
                  <Image src={src} alt="" fill sizes="(max-width: 700px) 45vw, 14vw" />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
