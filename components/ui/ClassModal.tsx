"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import type { GymClass } from "@/data/content";
import Button from "@/components/ui/Button";
import styles from "./ClassModal.module.css";

type Props = { cls: GymClass; onClose: () => void };

/** Detail overlay for a class. Closes on Esc, backdrop click or the close button. */
export default function ClassModal({ cls, onClose }: Props) {
  const backdrop = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    gsap
      .timeline({ onComplete: onClose })
      .to(panel.current, { y: 40, autoAlpha: 0, duration: 0.35, ease: "power3.in" })
      .to(backdrop.current, { autoAlpha: 0, duration: 0.25 }, "<");
  };

  useEffect(() => {
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    gsap.fromTo(backdrop.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    gsap.fromTo(panel.current, { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power4.out" });
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={backdrop}
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && close()}
      role="dialog"
      aria-modal="true"
      aria-label={cls.name}
    >
      <div ref={panel} className={styles.panel} data-tone={cls.tone}>
        <div className={styles.photo}>
          <Image src={cls.image} alt={`${cls.name} class`} fill sizes="(max-width: 800px) 90vw, 40vw" />
        </div>
        <div className={styles.body}>
          <p className={styles.chip}>{cls.category}</p>
          <h3 className={`${styles.title} display`}>{cls.name}</h3>
          <p className={styles.desc}>{cls.description}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Duration</dt>
              <dd>{cls.duration}</dd>
            </div>
            <div>
              <dt>Level</dt>
              <dd>{cls.level}</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <Button href="/timetable" variant="dark">
              See times
            </Button>
            <Button href="/form/schedule-visit" variant="outline">
              Try a free class
            </Button>
          </div>
        </div>
        <button ref={closeBtn} type="button" className={styles.close} aria-label="Close" onClick={close}>
          <span />
          <span />
        </button>
      </div>
    </div>
  );
}
