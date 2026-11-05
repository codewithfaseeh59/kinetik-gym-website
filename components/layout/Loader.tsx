"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { isLoaded, markLoaded } from "@/lib/loaded";
import { brand } from "@/data/content";
import styles from "./Loader.module.css";

const MIN_MS = 1100; // shortest time the loader stays up on a full-motion load
const MAX_MS = 4000; // safety net: never block the site longer than this

/**
 * Full-page loader shown on a hard load only (client-side navigation never remounts the layout).
 * It is part of the server HTML, so nothing underneath flashes before JavaScript arrives.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (isLoaded()) {
      // e.g. a Fast Refresh remount: the site is already live, so don't show it again
      el.style.display = "none";
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = el.querySelector<HTMLElement>("[data-count]");
    const bar = el.querySelector<HTMLElement>("[data-bar]");
    const state = { v: 0 };
    let cancelled = false;

    // lock the page while the loader is up
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const lenisTimer = window.setTimeout(() => getLenis()?.stop(), 0); // Lenis is created just after this effect

    const render = () => {
      if (counter) counter.textContent = String(Math.round(state.v)).padStart(3, "0");
      if (bar) bar.style.transform = `scaleX(${state.v / 100})`;
    };

    const unlock = () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };

    const finish = () => {
      if (cancelled) return;
      unlock();
      ScrollTrigger.refresh();
      setDone(true);
    };

    const ctx = gsap.context(() => {
      // ---- intro: wordmark rises letter by letter, mark spins in --------------------
      if (!reduce) {
        const split = SplitText.create("[data-word]", { type: "chars", mask: "chars" });
        gsap.from(split.chars, { yPercent: 115, duration: 1, ease: "power4.out", stagger: 0.05, delay: 0.1 });
        gsap.from("[data-mark]", { scale: 0, rotate: -120, duration: 1, ease: "back.out(1.6)", delay: 0.05 });
        gsap.from("[data-in]", { y: 20, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.4 });
      }

      // ---- progress: eases toward 90%, then completes once the page is truly ready --
      gsap.to(state, { v: 90, duration: reduce ? 0.2 : MIN_MS / 1000, ease: "power2.out", onUpdate: render });

      // Only fonts gate the first screen. Waiting for the window `load` event would also wait for
      // every below-the-fold image, which makes the loader drag on for no visible benefit.
      const pageReady = document.fonts?.ready ?? Promise.resolve();
      const minTime = new Promise<void>((r) => window.setTimeout(r, reduce ? 250 : MIN_MS));
      const failsafe = new Promise<void>((r) => window.setTimeout(r, MAX_MS));

      Promise.race([Promise.all([pageReady, minTime]), failsafe]).then(() => {
        if (cancelled) return;

        // ---- exit: count to 100, lift the text away, then raise the curtain ---------
        const exit = gsap.timeline({ onComplete: finish });
        exit.to(state, { v: 100, duration: reduce ? 0.1 : 0.3, ease: "power1.inOut", onUpdate: render });

        if (reduce) {
          exit.call(markLoaded).to(el, { autoAlpha: 0, duration: 0.4 });
          return;
        }

        exit
          .to("[data-out]", { yPercent: -130, duration: 0.5, ease: "power3.in", stagger: 0.05 }, "+=0.05")
          .addLabel("curtain", "-=0.15")
          // page entrance animations start now, as the curtain begins to lift
          .call(markLoaded, [], "curtain")
          .to(el, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "curtain");
      });
    }, el);

    return () => {
      cancelled = true;
      window.clearTimeout(lenisTimer);
      ctx.revert();
      unlock();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className={styles.loader} data-loader="" role="status" aria-label="Loading KINETIK">
      <div className={styles.top} aria-hidden="true">
        <span data-in="">{brand.name}</span>
        <span data-in="">Clubs · Classes · Wellness</span>
      </div>

      <div className={styles.center} aria-hidden="true">
        <svg className={styles.mark} data-mark="" viewBox="0 0 40 40">
          <path d="M4 4h9v13.5L25 4h12L21.5 20 38 36H26L13 22.5V36H4z" fill="currentColor" />
        </svg>
        <div className={styles.wordWrap} data-out="">
          <span className={`${styles.word} display`} data-word="">
            {brand.name}
          </span>
        </div>
      </div>

      <div className={styles.bottom} aria-hidden="true">
        <p className={styles.tag} data-out="">
          More than fitness.
          <br />
          Living at full power.
        </p>
        <p className={`${styles.count} display`} data-out="">
          <span data-count="">000</span>
          <small>%</small>
        </p>
      </div>

      <div className={styles.track} aria-hidden="true">
        <span className={styles.bar} data-bar="" />
      </div>
    </div>
  );
}
