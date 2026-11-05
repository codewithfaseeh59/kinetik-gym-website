"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { brand, cities } from "@/data/content";
import RollingTitle from "@/components/ui/RollingTitle";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useMotion(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from("[data-video]", { scale: 1.25, duration: 2.4, ease: "power3.out" }, 0)
      .from("[data-title]", { yPercent: 60, autoAlpha: 0, duration: 1.4 }, 0.2)
      .from("[data-hero]", { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.7);

    // video drifts and fades slightly as you scroll away
    gsap.to("[data-video]", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, root);

  return (
    <section ref={root} id="top" className={styles.hero} data-theme="dark">
      <div className={styles.media}>
        <video
          data-video=""
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.shade} />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <p data-hero="">
            Open every day
            <br />
            <strong>{brand.hoursLong}</strong>
          </p>
          <p data-hero="" className={styles.cities}>
            {cities.slice(0, -1).join(", ")} and {cities[cities.length - 1]}
          </p>
        </div>

        <h1 className="sr-only">Train every day</h1>
        <div data-title="" className={styles.title} aria-hidden="true">
          <RollingTitle text="Train every day" repeat={3} duration={32} />
        </div>

        <div className={styles.actions}>
          <p data-hero="" className={styles.club}>
            On your {brand.name} Club
          </p>
          <div data-hero="" className={styles.buttons}>
            <Button href="/form/join" variant="yellow">
              Sign up
            </Button>
            <Button href="/clubs" variant="outline">
              Find your club
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
