"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { classes, clubs, getClass } from "@/data/content";
import { daysShort, days, endTime, sessionsFor } from "@/data/timetable";
import Button from "@/components/ui/Button";
import styles from "./TimetableApp.module.css";

const todayIndex = () => (new Date().getDay() + 6) % 7; // Monday = 0
const minutesNow = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export default function TimetableApp() {
  const params = useSearchParams();
  const initialClub = clubs.some((c) => c.slug === params.get("club")) ? (params.get("club") as string) : clubs[0].slug;

  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [club, setClub] = useState(initialClub);
  const [day, setDay] = useState(0); // server renders Monday; the client switches to today after mount
  const [today, setToday] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [booked, setBooked] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDay(todayIndex());
    setToday(todayIndex());
    setNow(minutesNow());
  }, []);

  const rows = useMemo(() => sessionsFor(club, day), [club, day]);
  const nextId = useMemo(() => {
    if (today === null || day !== today || now === null) return null;
    return rows.find((r) => toMin(r.start) + r.minutes > now)?.id ?? null;
  }, [rows, day, today, now]);

  // rows slide in when the club or day changes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-row]", { y: 28, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.04 });
      });
      return () => mm.revert();
    },
    { scope: list, dependencies: [club, day], revertOnUpdate: true }
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const goNow = () => {
    setDay(todayIndex());
    setNow(minutesNow());
    window.setTimeout(() => {
      list.current?.querySelector("[data-next]")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const book = (id: string, name: string) => {
    setBooked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setToast(`Booking for ${name} cancelled`);
      } else {
        next.add(id);
        setToast(`You're booked into ${name} (demo only — nothing is saved)`);
      }
      return next;
    });
  };

  return (
    <section ref={root} className={styles.section} data-theme="dark">
      <div className={styles.controls}>
        <div className={styles.clubs} role="group" aria-label="Choose a club">
          {clubs.map((c) => (
            <button key={c.slug} type="button" className={styles.pill} aria-pressed={club === c.slug} onClick={() => setClub(c.slug)}>
              {c.name.replace("Club ", "")}
              <small>{c.city}</small>
            </button>
          ))}
        </div>
        <div className={styles.dayRow}>
          <div className={styles.days} role="tablist" aria-label="Choose a day">
            {daysShort.map((d, i) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={day === i}
                aria-label={days[i]}
                className={`${styles.day} ${today === i ? styles.today : ""}`}
                onClick={() => setDay(i)}
              >
                {d}
              </button>
            ))}
          </div>
          <Button variant="yellow" size="sm" onClick={goNow}>
            Now
          </Button>
        </div>
      </div>

      <h2 className={`${styles.dayTitle} display`}>
        {days[day]}
        <span> · {clubs.find((c) => c.slug === club)?.name}</span>
      </h2>

      {rows.length === 0 ? (
        <p className={styles.empty}>No classes scheduled for this day.</p>
      ) : (
        <ol ref={list} className={styles.list}>
          {rows.map((s) => {
            const cls = getClass(s.classSlug) ?? classes[0];
            const full = s.spots === 0;
            const isBooked = booked.has(s.id);
            const isNext = nextId === s.id;
            return (
              <li
                key={s.id}
                className={`${styles.row} ${isNext ? styles.next : ""}`}
                data-row=""
                data-tone={cls.tone}
                {...(isNext ? { "data-next": "" } : {})}
              >
                <div className={styles.time}>
                  <strong className="display">{s.start}</strong>
                  <span>{endTime(s.start, s.minutes)}</span>
                </div>
                <div className={styles.what}>
                  <h3 className={`${styles.name} display`}>{cls.name}</h3>
                  <p className={styles.meta}>
                    <span className={styles.dot} />
                    {cls.category} · {cls.level}
                  </p>
                </div>
                <p className={styles.coach}>
                  <small>Instructor</small>
                  {s.instructor}
                </p>
                <p className={styles.spots}>{full ? "Full" : `${s.spots} spots`}</p>
                <Button
                  variant={isBooked ? "nutrition" : full ? "outline" : "yellow"}
                  size="sm"
                  disabled={full && !isBooked}
                  onClick={() => book(s.id, cls.name)}
                >
                  {isBooked ? "Booked ✓" : full ? "Join waitlist" : "Book"}
                </Button>
                {isNext && <span className={styles.nextTag}>Up next</span>}
              </li>
            );
          })}
        </ol>
      )}

      <p className={styles.toast} role="status" aria-live="polite" data-show={toast ? "true" : "false"}>
        {toast}
      </p>
    </section>
  );
}
