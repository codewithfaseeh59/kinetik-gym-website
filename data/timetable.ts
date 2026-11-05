import { classes, clubs } from "@/data/content";

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const daysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type Session = {
  id: string;
  club: string;
  day: number; // 0 = Monday
  start: string; // "HH:MM"
  minutes: number;
  classSlug: string;
  instructor: string;
  spots: number; // 0 = full
};

const instructors = ["Maya R.", "Jonas K.", "Lena P.", "Tomás V.", "Aisha B.", "Noor S.", "Diego F.", "Inês M."];
const weekdaySlots = ["06:45", "08:00", "09:15", "12:15", "17:30", "18:30", "19:30", "20:30"];
const weekendSlots = ["09:00", "10:15", "11:30", "16:00"];

const toMinutes = (d: string) => parseInt(d, 10) || 45;

/**
 * Deterministic demo timetable: the same on the server and the client (no Math.random),
 * so there are no hydration mismatches.
 */
export const sessions: Session[] = (() => {
  const out: Session[] = [];
  clubs.forEach((club, ci) => {
    for (let day = 0; day < 7; day++) {
      const slots = day < 5 ? weekdaySlots : weekendSlots;
      slots.forEach((start, si) => {
        if ((ci + day + si) % 5 === 4) return; // leave some gaps
        let idx = (ci * 11 + day * 7 + si * 5) % classes.length;
        // keep kids' classes out of the late evening
        if (classes[idx].category === "Kids" && start >= "17:30") idx = (idx + 3) % classes.length;
        const cls = classes[idx];
        out.push({
          id: `${club.slug}-${day}-${start}`,
          club: club.slug,
          day,
          start,
          minutes: toMinutes(cls.duration),
          classSlug: cls.slug,
          instructor: instructors[(ci + day * 3 + si) % instructors.length],
          spots: (ci * 3 + day + si * 4) % 12,
        });
      });
    }
  });
  return out;
})();

export const sessionsFor = (club: string, day: number) =>
  sessions.filter((s) => s.club === club && s.day === day).sort((a, b) => a.start.localeCompare(b.start));

export const classSlugsForClub = (club: string) => Array.from(new Set(sessions.filter((s) => s.club === club).map((s) => s.classSlug)));

export const endTime = (start: string, minutes: number) => {
  const [h, m] = start.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};
