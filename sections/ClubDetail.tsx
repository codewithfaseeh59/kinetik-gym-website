"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { classes, type Club } from "@/data/content";
import { classSlugsForClub } from "@/data/timetable";
import ParallaxImage from "@/components/ui/ParallaxImage";
import SplitReveal from "@/components/ui/SplitReveal";
import DraggableList from "@/components/ui/DraggableList";
import ClassCard from "@/components/ui/ClassCard";
import Button from "@/components/ui/Button";
import styles from "./ClubDetail.module.css";

/** Everything on a single club page, from hero to class rail. */
export default function ClubDetail({ club }: { club: Club }) {
  const root = useRef<HTMLDivElement>(null);
  const clubClasses = classSlugsForClub(club.slug)
    .map((slug) => classes.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 10);

  useMotion(() => {
    // stat numbers count up
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      el.textContent = "0"; // the real value is server-rendered, so reduced-motion users still see it
      gsap.to(obj, {
        v: end,
        duration: 1.8,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.v).toLocaleString("en-US");
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    gsap.from("[data-col]", {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.12,
      scrollTrigger: { trigger: "[data-cols]", start: "top 85%", once: true },
    });
    gsap.from("[data-chip]", {
      scale: 0.6,
      autoAlpha: 0,
      duration: 0.7,
      ease: "back.out(2)",
      stagger: 0.06,
      scrollTrigger: { trigger: "[data-chips]", start: "top 88%", once: true },
    });
  }, root);

  return (
    <div ref={root}>
      {/* hero */}
      <section className={styles.hero} data-theme="dark">
        <div className={styles.heroMedia}>
          <ParallaxImage src={club.image} alt={`${club.name} in ${club.city}`} sizes="100vw" priority speed={10} />
          <div className={styles.shade} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>
            {club.type} · {club.city}
          </p>
          <SplitReveal as="h1" className={`${styles.title} display`}>
            {club.name}
          </SplitReveal>
        </div>
      </section>

      {/* intro + facts */}
      <section className={styles.intro} data-theme="light">
        <div className={styles.introText}>
          <SplitReveal as="h2" className={`${styles.tagline} display`}>
            {club.tagline}
          </SplitReveal>
          <SplitReveal as="p" className={styles.blurb}>
            {club.blurb}
          </SplitReveal>
        </div>

        <dl className={styles.stats}>
          <div>
            <dt>Size</dt>
            <dd className="display">{club.size}</dd>
          </div>
          <div>
            <dt>Founded</dt>
            <dd className="display">{club.founded}</dd>
          </div>
          <div>
            <dt>Classes a week</dt>
            <dd className="display">
              <span data-count={club.classesPerWeek}>{club.classesPerWeek}</span>+
            </dd>
          </div>
        </dl>

        <div className={styles.cols} data-cols="">
          <div className={styles.col} data-col="">
            <h3>Find us</h3>
            <p>{club.address}</p>
            <a
              className={styles.textLink}
              href={`https://www.google.com/maps/search/${encodeURIComponent(club.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              View map ↗
            </a>
          </div>
          <div className={styles.col} data-col="">
            <h3>Schedule</h3>
            {club.schedule.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <div className={styles.col} data-col="">
            <h3>Contact</h3>
            <p>{club.phone}</p>
            <p className={styles.note}>* Calls to landline network</p>
          </div>
        </div>

        <div className={styles.cta}>
          <Button href="/form/schedule-visit" variant="dark">
            Schedule a visit
          </Button>
          <Button href={`/timetable?club=${club.slug}`} variant="outline">
            See this club&apos;s timetable
          </Button>
        </div>
      </section>

      {/* facilities */}
      <section className={styles.facilities} data-theme="dark">
        <SplitReveal as="h2" className={`${styles.h2} display`}>
          What&apos;s inside
        </SplitReveal>
        <ul className={styles.chips} data-chips="">
          {club.facilities.map((f) => (
            <li key={f} className={styles.chipItem} data-chip="">
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* gallery */}
      <section className={styles.gallery} data-theme="dark">
        <DraggableList>
          {club.gallery.map((src, i) => (
            <li key={`${src}-${i}`} className={styles.shot}>
              <Image src={src} alt={`${club.name} photo ${i + 1}`} fill sizes="(max-width: 768px) 80vw, 36vw" draggable={false} />
            </li>
          ))}
        </DraggableList>
      </section>

      {/* classes at this club */}
      <section className={styles.classes} data-theme="dark">
        <div className={styles.classesHead}>
          <SplitReveal as="h2" className={`${styles.h2} display`}>
            Classes at {club.name.replace("Club ", "")}
          </SplitReveal>
          <Button href="/classes" variant="yellow">
            All classes
          </Button>
        </div>
        <DraggableList>
          {clubClasses.map((c) => (
            <ClassCard key={c.slug} cls={c} />
          ))}
        </DraggableList>
      </section>
    </div>
  );
}
