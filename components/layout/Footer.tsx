"use client";

import { useState } from "react";
import Link from "next/link";
import { brand, clubs, nav } from "@/data/content";
import SplitReveal from "@/components/ui/SplitReveal";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  const [lang, setLang] = useState<"EN" | "PT">("EN");

  return (
    <footer className={styles.footer} data-theme="dark">
      <div id="join" className={styles.cta}>
        <SplitReveal as="h2" className={`${styles.ctaTitle} display`}>
          Ready to train? Your first step starts here.
        </SplitReveal>
        <div className={styles.ctaActions}>
          <Button href="/form/join" variant="yellow">
            Join KINETIK
          </Button>
          <Button href="/form/schedule-visit" variant="outline">
            Schedule a visit
          </Button>
        </div>
      </div>

      <div className={styles.cols}>
        <div className={styles.col}>
          <Logo />
          <p className={styles.tag}>{brand.tagline}</p>
        </div>
        <nav className={styles.col} aria-label="Footer">
          <p className={styles.colTitle}>Explore</p>
          <ul>
            {nav.map((n) => (
              <li key={n.label}>
                <Link href={n.href} prefetch={false} className={styles.link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.col}>
          <p className={styles.colTitle}>Clubs</p>
          <ul>
            {clubs.map((c) => (
              <li key={c.slug}>
                <Link href={`/clubs/${c.slug}`} prefetch={false} className={styles.link}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <p className={styles.colTitle}>Language</p>
          <div className={styles.lang} role="group" aria-label="Language">
            {(["EN", "PT"] as const).map((l) => (
              <button key={l} type="button" className={styles.langBtn} aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l}
              </button>
            ))}
          </div>
          <p className={styles.small}>
            Open every day
            <br />
            {brand.hoursLong}
          </p>
          <p className={styles.small}>Call {brand.phone}</p>
        </div>
      </div>

      <SplitReveal as="div" type="chars" className={`${styles.mark} display`} start="top 100%">
        {brand.name}
      </SplitReveal>

      <div className={styles.legal}>
        <span>© 2026 {brand.name}. Demo project.</span>
        <span>Photos &amp; video from Unsplash and Pexels.</span>
        <span className={styles.legalLinks}>
          <Link href="/privacy-policy" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="/form/know-more" prefetch={false}>
            Contact
          </Link>
        </span>
      </div>
    </footer>
  );
}
