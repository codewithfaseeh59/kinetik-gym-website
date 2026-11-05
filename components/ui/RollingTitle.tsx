"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import styles from "./RollingTitle.module.css";

type Props = {
  text: string;
  /** copies of the text per half-track; must cover the viewport width */
  repeat?: number;
  /** seconds for one full loop */
  duration?: number;
  outline?: boolean;
  className?: string;
};

function Star() {
  return (
    <svg className={styles.star} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0l4.6 15.4L40 20l-15.4 4.6L20 40l-4.6-15.4L0 20l15.4-4.6z" fill="currentColor" />
    </svg>
  );
}

/** Infinite marquee headline that speeds up (and reverses) with scroll velocity. */
export default function RollingTitle({
  text,
  repeat = 4,
  duration = 28,
  outline = false,
  className = "",
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useMotion(
    () => {
      const tween = gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration,
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const boost = Math.min(1 + Math.abs(self.getVelocity()) / 260, 7);
          gsap.to(tween, {
            timeScale: self.direction * boost,
            duration: 0.25,
            overwrite: true,
            onComplete: () => {
              gsap.to(tween, { timeScale: self.direction, duration: 1.2 });
            },
          });
        },
      });
    },
    root
  );

  const group = (key: string, hidden: boolean) => (
    <div className={styles.group} key={key} aria-hidden={hidden || undefined}>
      {Array.from({ length: repeat }, (_, i) => (
        <span className={styles.item} key={i}>
          <span className={styles.text}>{text}</span>
          <Star />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`${styles.root} ${outline ? styles.outline : ""} ${className}`}>
      <div ref={track} className={styles.track}>
        {group("a", false)}
        {group("b", true)}
      </div>
    </div>
  );
}
