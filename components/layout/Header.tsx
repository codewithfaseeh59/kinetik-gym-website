"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { nav, brand, clubs } from "@/data/content";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import styles from "./Header.module.css";

export default function Header() {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // --- menu timeline (built once) ------------------------------------------
  useGSAP(
    () => {
      const menuEl = menu.current;
      if (!menuEl) return;
      const links = menuEl.querySelectorAll("[data-link]");
      const fades = menuEl.querySelectorAll("[data-fade]");
      gsap.set(menuEl, { clipPath: "inset(0% 0% 100% 0%)", visibility: "hidden" });
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power4.out" },
          onStart: () => {
            gsap.set(menuEl, { visibility: "visible" });
          },
          onReverseComplete: () => {
            gsap.set(menuEl, { visibility: "hidden" });
          },
        })
        .to(menuEl, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07 }, 0.35)
        .fromTo(fades, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.55);
    },
    { scope: menu }
  );

  // --- scroll behaviour, re-registered for every page ----------------------
  // The new page's DOM isn't always committed when the pathname changes, so registration is
  // deferred a beat; triggers are tracked by hand because they're created after the context ends.
  useGSAP(
    () => {
      const headerEl = header.current;
      if (!headerEl) return;

      const triggers: ScrollTrigger[] = [];
      const register = () => {
        headerEl.dataset.hidden = "false";
        const sections = gsap.utils.toArray<HTMLElement>("[data-theme]").filter((s) => !headerEl.contains(s));
        headerEl.dataset.theme = sections[0]?.dataset.theme ?? "dark";

        // hide on scroll down, reveal on scroll up
        triggers.push(
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate(self) {
              headerEl.dataset.hidden = String(self.direction === 1 && self.scroll() > 240);
            },
          })
        );

        // colour theme follows the section under the header
        sections.forEach((sec) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: sec,
              start: "top 44px",
              end: "bottom 44px",
              onToggle(self) {
                if (self.isActive) headerEl.dataset.theme = sec.dataset.theme ?? "dark";
              },
            })
          );
        });
      };

      const timer = window.setTimeout(register, 150);
      return () => {
        window.clearTimeout(timer);
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: header, dependencies: [pathname] }
  );

  const toggle = (next: boolean) => {
    setOpen(next);
    const lenis = getLenis();
    if (next) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      tl.current?.timeScale(1).play();
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      tl.current?.timeScale(1.4).reverse();
    }
  };

  const onLogo = () => {
    if (open) toggle(false);
    if (pathname === "/") getLenis()?.scrollTo(0, { duration: 1.2 });
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header ref={header} className={styles.header} data-theme="dark" data-hidden="false" data-open={open}>
        <Link href="/" prefetch={false} className={styles.logo} aria-label={`${brand.name} home`} onClick={onLogo}>
          <Logo />
        </Link>
        <div className={styles.right}>
          <Button
            href="/form/join"
            variant={open ? "dark" : "yellow"}
            size="sm"
            className={styles.join}
            onClick={() => open && toggle(false)}
          >
            Join
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => toggle(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav id="site-menu" ref={menu} className={styles.menu} aria-hidden={!open} aria-label="Main">
        <div className={styles.menuInner}>
          <ul className={styles.links}>
            {nav.map((item, i) => (
              <li key={item.label} className={styles.linkRow}>
                <Link
                  href={item.href}
                  prefetch={false}
                  data-link=""
                  className={styles.link}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => toggle(false)}
                  tabIndex={open ? 0 : -1}
                >
                  <span className={styles.idx}>0{i + 1}</span>
                  <span className={`${styles.linkText} display`}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.aside}>
            <div data-fade="">
              <p className={styles.asideLabel}>Open every day</p>
              <p className={styles.asideBig}>{brand.hoursLong}</p>
            </div>
            <div data-fade="">
              <p className={styles.asideLabel}>Clubs</p>
              <p className={styles.asideBig}>{clubs.map((c) => c.name.replace("Club ", "")).join(", ")}</p>
            </div>
            <div data-fade="" className={styles.asideActions}>
              <Button href="/form/join" variant="dark" onClick={() => toggle(false)}>
                Join KINETIK
              </Button>
              <Button href="/form/schedule-visit" variant="outline" onClick={() => toggle(false)}>
                Schedule a visit
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
