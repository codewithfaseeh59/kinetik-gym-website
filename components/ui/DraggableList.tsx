"use client";

import { useRef, type ReactNode } from "react";
import { gsap, Draggable, useGSAP } from "@/lib/gsap";
import styles from "./DraggableList.module.css";

/** Horizontal drag/swipe rail with inertia and a "Drag" cursor bubble. */
export default function DraggableList({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapEl = wrap.current;
      const trackEl = track.current;
      const cursorEl = cursor.current;
      if (!wrapEl || !trackEl || !cursorEl) return;

      const bounds = () => ({
        minX: Math.min(0, wrapEl.clientWidth - trackEl.scrollWidth),
        maxX: 0,
      });

      const [drag] = Draggable.create(trackEl, {
        type: "x",
        inertia: true,
        bounds: bounds(),
        edgeResistance: 0.85,
        allowContextMenu: true,
        onPress() {
          wrapEl.dataset.dragging = "true";
        },
        onRelease() {
          delete wrapEl.dataset.dragging;
        },
      });

      const onResize = () => drag.applyBounds(bounds());
      window.addEventListener("resize", onResize);

      // cursor bubble (fine pointers only)
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let cleanup = () => {};
      if (fine) {
        const xTo = gsap.quickTo(cursorEl, "x", { duration: 0.45, ease: "power3" });
        const yTo = gsap.quickTo(cursorEl, "y", { duration: 0.45, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = wrapEl.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        const enter = () => gsap.to(cursorEl, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power3.out" });
        const leave = () => gsap.to(cursorEl, { scale: 0.3, autoAlpha: 0, duration: 0.3 });
        gsap.set(cursorEl, { scale: 0.3, autoAlpha: 0 });
        wrapEl.addEventListener("pointermove", move);
        wrapEl.addEventListener("pointerenter", enter);
        wrapEl.addEventListener("pointerleave", leave);
        cleanup = () => {
          wrapEl.removeEventListener("pointermove", move);
          wrapEl.removeEventListener("pointerenter", enter);
          wrapEl.removeEventListener("pointerleave", leave);
        };
      }

      return () => {
        window.removeEventListener("resize", onResize);
        cleanup();
        drag.kill();
      };
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap} className={styles.wrap}>
      <ul ref={track} className={styles.track}>
        {children}
      </ul>
      <div ref={cursor} className={styles.cursor} aria-hidden="true">
        Drag
      </div>
    </div>
  );
}
