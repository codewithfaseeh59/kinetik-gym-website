import RollingTitle from "@/components/ui/RollingTitle";
import Button from "@/components/ui/Button";
import styles from "./ReadyBanner.module.css";

type Props = {
  text: string;
  /** the supporting line */
  sub?: string;
  tone?: "yellow" | "dark";
};

/** Closing call-to-action: a marquee headline plus join / visit buttons. */
export default function ReadyBanner({ text, sub = "Join today and get your first month free.", tone = "yellow" }: Props) {
  return (
    <section className={`${styles.banner} ${styles[tone]}`} data-theme={tone === "dark" ? "dark" : "yellow"}>
      <RollingTitle text={text} repeat={3} duration={30} />
      <div className={styles.row}>
        <p className={styles.sub}>{sub}</p>
        <div className={styles.actions}>
          <Button href="/form/join" variant={tone === "dark" ? "yellow" : "dark"}>
            Join KINETIK
          </Button>
          <Button href="/form/schedule-visit" variant="outline">
            Schedule a visit
          </Button>
        </div>
      </div>
    </section>
  );
}
