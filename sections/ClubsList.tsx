"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { clubs } from "@/data/content";
import SplitReveal from "@/components/ui/SplitReveal";
import CircleButton from "@/components/ui/CircleButton";
import styles from "./ClubsList.module.css";

type Props = {
  title?: string;
  /** slug of a club to leave out (e.g. the one being viewed) */
  exclude?: string;
};

export default function ClubsList({ title = "Find your club", exclude }: Props) {
  const root = useRef<HTMLElement>(null);
  const list = clubs.filter((c) => c.slug !== exclude);

  useMotion(() => {
    gsap.utils.toArray<HTMLElement>("[data-club]").forEach((el) => {
      gsap.from(el, {
        y: 80,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });
  }, root);

  return (
    <section ref={root} id="clubs-list" className={styles.section} data-theme="yellow">
      <SplitReveal as="h2" className={`${styles.title} display`}>
        {title}
      </SplitReveal>

      <ul className={styles.list}>
        {list.map((c, i) => (
          <li key={c.slug} className={styles.club} data-club="">
            <div className={styles.card}>
              <div className={styles.row}>
                <span className={styles.idx}>0{i + 1}</span>
                <h3 className={`${styles.name} display`}>{c.name}</h3>
                <p className={styles.city}>{c.city}</p>
                <p className={styles.hours}>{c.hours}</p>
                <CircleButton label={`Visit ${c.name}`} href={`/clubs/${c.slug}`} className={styles.circle} />
              </div>
              <div className={styles.more}>
                <div className={styles.moreInner}>
                  <div className={styles.photo}>
                    <Image src={c.image} alt={`${c.name} interior`} fill sizes="(max-width: 700px) 90vw, 30vw" />
                  </div>
                  <div className={styles.details}>
                    <p>{c.address}</p>
                    <ul className={styles.perks}>
                      {c.perks.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
