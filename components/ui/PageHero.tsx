import type { ReactNode } from "react";
import SplitReveal from "@/components/ui/SplitReveal";
import styles from "./PageHero.module.css";

type Props = {
  title: string;
  eyebrow?: string;
  sub?: string;
  /** supporting statement shown to the right on wide screens */
  statement?: string;
  tone?: "dark" | "yellow" | "light";
  /** shorter hero for utility pages (timetable, forms) */
  compact?: boolean;
  children?: ReactNode;
};

/** Big page opener: eyebrow, huge condensed title, subtitle and optional actions. */
export default function PageHero({ title, eyebrow, sub, statement, tone = "dark", compact = false, children }: Props) {
  return (
    <section
      className={`${styles.hero} ${styles[tone]} ${compact ? styles.compact : ""}`}
      data-theme={tone === "dark" ? "dark" : tone}
    >
      <div className={styles.top}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        {sub && <p className={styles.sub}>{sub}</p>}
      </div>
      <SplitReveal as="h1" className={`${styles.title} display`}>
        {title}
      </SplitReveal>
      {(statement || children) && (
        <div className={styles.bottom}>
          {statement && (
            <SplitReveal as="h2" className={styles.statement} delay={0.15}>
              {statement}
            </SplitReveal>
          )}
          {children && <div className={styles.actions}>{children}</div>}
        </div>
      )}
    </section>
  );
}
