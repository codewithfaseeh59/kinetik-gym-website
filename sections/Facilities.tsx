"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotion } from "@/lib/useMotion";
import { facilities } from "@/data/content";
import SplitReveal from "@/components/ui/SplitReveal";
import styles from "./Facilities.module.css";

export default function Facilities() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const imgs = useRef<(HTMLDivElement | null)[]>([]);

  // rows draw their divider line and slide up
  useMotion(() => {
    gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
      gsap.from(row, {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: row, start: "top 92%", once: true },
      });
      gsap.fromTo(
        row.querySelector("[data-line]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: row, start: "top 92%", once: true } }
      );
    });
  }, root);

  // cursor-following image preview (pointer devices only)
  useGSAP(
    () => {
      const el = preview.current;
      const section = root.current;
      if (!el || !section) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.8 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const rotTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3" });
      let lastX = 0;
      let shown = false;

      const hide = () => {
        if (!shown) return;
        shown = false;
        gsap.to(el, { autoAlpha: 0, scale: 0.8, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      };

      const rows = section.querySelectorAll<HTMLElement>("[data-row]");

      const show = (i: number, e: PointerEvent) => {
        imgs.current.forEach((n, j) => n && gsap.to(n, { autoAlpha: j === i ? 1 : 0, duration: 0.3, overwrite: true }));
        if (!shown) {
          // start at the pointer so it doesn't fly in from the last position
          gsap.set(el, { x: e.clientX, y: e.clientY });
          shown = true;
          gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      };

      const move = (e: PointerEvent) => {
        const row = (e.target as Element | null)?.closest<HTMLElement>("[data-row]");
        if (!row) {
          // pointer is no longer over a row (e.g. the page scrolled under a still mouse)
          hide();
          return;
        }
        // pointerenter doesn't fire when a row scrolls under a still pointer, so show here too
        if (!shown) show(Array.from(rows).indexOf(row), e);
        xTo(e.clientX);
        yTo(e.clientY);
        rotTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
        lastX = e.clientX;
      };

      const enters: Array<(e: PointerEvent) => void> = [];

      rows.forEach((row, i) => {
        // moving between rows swaps the image; the first enter also fades the preview in
        const enter = (e: PointerEvent) => show(i, e);
        enters.push(enter);
        row.addEventListener("pointerenter", enter);
        row.addEventListener("pointerleave", hide);
      });

      section.addEventListener("pointermove", move);
      section.addEventListener("pointerleave", hide);
      // scrolling moves rows away from a stationary cursor without firing pointerleave
      window.addEventListener("scroll", hide, { passive: true });
      window.addEventListener("blur", hide);

      return () => {
        section.removeEventListener("pointermove", move);
        section.removeEventListener("pointerleave", hide);
        window.removeEventListener("scroll", hide);
        window.removeEventListener("blur", hide);
        rows.forEach((row, i) => {
          row.removeEventListener("pointerenter", enters[i]);
          row.removeEventListener("pointerleave", hide);
        });
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="facilities" className={styles.section} data-theme="dark">
      <SplitReveal as="h2" className={`${styles.heading} display`}>
        Everything you need under one roof
      </SplitReveal>

      <ul className={styles.list}>
        {facilities.map((f, i) => (
          <li key={f.name} className={styles.row} data-row="">
            <span className={styles.line} data-line="" />
            <Link href={f.href} prefetch={false} className={styles.link}>
              <span className={styles.idx}>0{i + 1}</span>
              <span className={`${styles.name} display`}>{f.name}</span>
              <span className={styles.thumb}>
                <Image src={f.image} alt="" fill sizes="90px" />
              </span>
              <span className={styles.arrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div ref={preview} className={styles.preview} aria-hidden="true">
        {facilities.map((f, i) => (
          <div
            key={f.name}
            ref={(n) => {
              imgs.current[i] = n;
            }}
            className={styles.previewImg}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image src={f.image} alt="" fill sizes="380px" />
          </div>
        ))}
      </div>
    </section>
  );
}
