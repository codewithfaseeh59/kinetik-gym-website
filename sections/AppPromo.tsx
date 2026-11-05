"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { brand } from "@/data/content";
import SplitReveal from "@/components/ui/SplitReveal";
import Button from "@/components/ui/Button";
import styles from "./AppPromo.module.css";

const schedule = [
  { time: "07:00", name: "Sunrise Flow", spots: "4 spots" },
  { time: "12:30", name: "Heavy Lift", spots: "Booked", full: true },
  { time: "18:15", name: "Boxing Fit", spots: "9 spots" },
];

function StoreBadge({ store }: { store: "App Store" | "Google Play" }) {
  return (
    <a href="#" className={styles.badge} aria-label={`Download on ${store}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        {store === "App Store" ? (
          <path d="M11 3h2v10.2l3.6-3.6L18 11l-6 6-6-6 1.400-1.400L11 13.200zM5 19h14v2H5z" />
        ) : (
          <path d="M5 3.500v17a.8.8 0 0 0 1.200.7L20 12 6.200 2.800A.8.8 0 0 0 5 3.500z" />
        )}
      </svg>
      <span>
        <small>{store === "App Store" ? "Download on the" : "Get it on"}</small>
        {store}
      </span>
    </a>
  );
}

export default function AppPromo() {
  const root = useRef<HTMLElement>(null);

  useMotion(() => {
    gsap.fromTo(
      "[data-phone]",
      { yPercent: 14, rotate: 5 },
      {
        yPercent: -8,
        rotate: -3,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
    gsap.from("[data-row]", {
      x: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: { trigger: "[data-phone]", start: "top 70%", once: true },
    });
  }, root);

  return (
    <section ref={root} id="app" className={styles.section} data-theme="yellow">
      <div className={styles.text}>
        <p className={styles.eyebrow}>The {brand.name} app</p>
        <SplitReveal as="h2" className={`${styles.title} display`}>
          Your club, in your pocket
        </SplitReveal>
        <SplitReveal as="p" className={styles.lead}>
          Schedule and manage your classes, access your training plan, book appointments, and much more!
        </SplitReveal>
        <div className={styles.badges}>
          <StoreBadge store="App Store" />
          <StoreBadge store="Google Play" />
        </div>
        <Button href="/form/know-more" variant="dark">
          Know more
        </Button>
      </div>

      <div className={styles.stage}>
        <div className={styles.blob} aria-hidden="true" />
        <div className={styles.phone} data-phone="">
          <div className={styles.notch} />
          <div className={styles.screen}>
            <div className={styles.cover}>
              <Image src="/images/group2.jpg" alt="" fill sizes="320px" />
              <div className={styles.coverText}>
                <small>Today</small>
                <strong className="display">Hi, Alex</strong>
              </div>
            </div>
            <ul className={styles.rows}>
              {schedule.map((s) => (
                <li key={s.time} data-row="" className={styles.rowItem}>
                  <span className={styles.time}>{s.time}</span>
                  <span className={styles.cls}>
                    {s.name}
                    <small>{s.spots}</small>
                  </span>
                  <span className={`${styles.book} ${s.full ? styles.full : ""}`}>{s.full ? "Full" : "Book"}</span>
                </li>
              ))}
            </ul>
            <div className={styles.tabs}>
              <span className={styles.on} />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
