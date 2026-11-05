import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — KINETIK",
  description: "How the KINETIK demo site handles your information.",
};

const sections = [
  {
    title: "This is a demo",
    body: [
      "KINETIK is a demonstration website. It has no server and no database, and the forms on this site do not send your information anywhere.",
      "Anything you type into a form stays in your browser and is discarded when you leave or refresh the page.",
    ],
  },
  {
    title: "What we collect",
    body: [
      "Nothing. The site does not use cookies, analytics or tracking scripts.",
      "Fonts are loaded from Google Fonts at build time and served from this site. Photos and video are served from this site too.",
    ],
  },
  {
    title: "If this were a live site",
    body: [
      "A live gym would collect the details you submit (such as your name, email, phone number and preferred club) only to respond to your request, manage your membership and book your classes.",
      "You would be able to ask to see, correct or delete your information at any time by contacting the club.",
    ],
  },
  {
    title: "Contact",
    body: ["Questions about this page? Use the Contact link in the footer."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero compact tone="light" eyebrow="Legal" title="Privacy" sub="Last updated November 2026" />
      <section className={styles.section} data-theme="light">
        {sections.map((s) => (
          <article key={s.title} className={styles.block}>
            <h2 className={`${styles.h2} display`}>{s.title}</h2>
            <div className={styles.text}>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
