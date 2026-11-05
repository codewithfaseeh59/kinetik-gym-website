"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import styles from "./ParallaxImage.module.css";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** strength of the vertical drift, as a percent of the frame */
  speed?: number;
  /** also animate the frame open (clip-path) as it enters */
  reveal?: boolean;
};

export default function ParallaxImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  className = "",
  speed = 8,
  reveal = false,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useMotion(
    () => {
      gsap.fromTo(
        inner.current,
        { yPercent: -speed, scale: 1.18 },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      if (reveal) {
        gsap.from(wrap.current, {
          clipPath: "inset(14% 14% 14% 14% round 28px)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: wrap.current, start: "top 85%", once: true },
        });
      }
    },
    wrap
  );

  return (
    <div ref={wrap} className={`${styles.wrap} ${className}`}>
      <div ref={inner} className={styles.inner}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} />
      </div>
    </div>
  );
}
