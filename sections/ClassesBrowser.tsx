"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { categories, categoryTone, classes, type Category, type GymClass } from "@/data/content";
import ClassCard from "@/components/ui/ClassCard";
import ClassModal from "@/components/ui/ClassModal";
import styles from "./ClassesBrowser.module.css";

/** Filter chips + grid of every class; clicking a card opens its details. */
export default function ClassesBrowser() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Category | "All">("All");
  const [selected, setSelected] = useState<GymClass | null>(null);

  const shown = filter === "All" ? classes : classes.filter((c) => c.category === filter);

  // cards pop in whenever the filter changes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-card]", {
          y: 60,
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.04,
          scrollTrigger: { trigger: "[data-grid]", start: "top 92%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true }
  );

  return (
    <section ref={root} className={styles.section} data-theme="light">
      <div className={styles.bar}>
        <p className={styles.label}>Filter</p>
        <div className={styles.chips} role="group" aria-label="Filter classes by category">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              className={styles.chip}
              data-tone={c === "All" ? "yellow" : categoryTone[c]}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className={styles.count} aria-live="polite">
          {shown.length} {shown.length === 1 ? "class" : "classes"}
        </p>
      </div>

      <ul className={styles.grid} data-grid="">
        {shown.map((c) => (
          <ClassCard key={c.slug} cls={c} onSelect={setSelected} className={styles.card} />
        ))}
      </ul>

      {selected && <ClassModal cls={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
