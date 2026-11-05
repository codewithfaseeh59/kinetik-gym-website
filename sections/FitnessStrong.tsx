"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import styles from "./FitnessStrong.module.css";

export default function FitnessStrong() {
  const root = useRef<HTMLElement>(null);

  useMotion(() => {
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
      },
    });

    tl.fromTo("[data-w1]", { xPercent: 0 }, { xPercent: -42 }, 0)
      .fromTo("[data-w2]", { xPercent: 0 }, { xPercent: 42 }, 0)
      .fromTo(
        "[data-media]",
        { clipPath: "inset(30% 34% 30% 34% round 28px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)" },
        0
      )
      .fromTo("[data-img]", { scale: 1.5 }, { scale: 1 }, 0)
      .to("[data-w1], [data-w2]", { autoAlpha: 0, duration: 0.3 }, 0.55)
      .fromTo("[data-caption]", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.65);
  }, root);

  return (
    <section ref={root} id="fitness" className={styles.section} data-theme="yellow">
      <div className={styles.stage}>
        <div className={styles.media} data-media="">
          <Image
            data-img=""
            src="/images/strong.jpg"
            alt="Athlete in a modern gym lifting a heavy dumbbell"
            fill
            sizes="100vw"
            className={styles.img}
          />
          <div className={styles.veil} />
          <p className={`${styles.caption} display`} data-caption="">
            Strong body.
            <br />
            Strong mind.
          </p>
        </div>

        <h2 className={`${styles.word} ${styles.top} display`} data-w1="">
          Fitness
        </h2>
        <h2 className={`${styles.word} ${styles.bottom} display`} data-w2="">
          Strong
        </h2>
      </div>
    </section>
  );
}
