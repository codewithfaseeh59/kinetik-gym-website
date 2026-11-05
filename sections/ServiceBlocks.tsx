"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { services } from "@/data/content";
import ParallaxImage from "@/components/ui/ParallaxImage";
import SplitReveal from "@/components/ui/SplitReveal";
import Button from "@/components/ui/Button";
import styles from "./ServiceBlocks.module.css";

/** The four Fitness Hub services, each on its own colour. */
export default function ServiceBlocks() {
  const root = useRef<HTMLDivElement>(null);

  useMotion(() => {
    gsap.utils.toArray<HTMLElement>("[data-features]").forEach((group) => {
      gsap.from(group.children, {
        y: 70,
        autoAlpha: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: group, start: "top 85%", once: true },
      });
    });
  }, root);

  return (
    <div ref={root}>
      {services.map((s, i) => (
        <section key={s.key} id={s.key} className={styles.block} data-tone={s.tone} data-theme="light">
          <div className={styles.left}>
            <p className={styles.num}>0{i + 1} / 0{services.length}</p>
            <h2 className={`${styles.name} display`}>
              {s.name}
              <span className={styles.brand}>KINETIK</span>
            </h2>
            <SplitReveal as="p" className={styles.intro}>
              {s.intro}
            </SplitReveal>
            <p className={styles.closing}>{s.closing}</p>
            <Button href="/form/know-more" variant="dark">
              Know more
            </Button>
          </div>

          <div className={styles.right}>
            <div className={styles.photo}>
              <ParallaxImage src={s.image} alt={`${s.name} service`} sizes="(max-width: 900px) 100vw, 45vw" reveal />
            </div>
            <ul className={styles.features} data-features="">
              {s.features.map((f, j) => (
                <li key={f.title} className={styles.feature}>
                  <span className={styles.fnum}>0{j + 1}</span>
                  <h3 className={`${styles.ftitle} display`}>{f.title}</h3>
                  <p>{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
