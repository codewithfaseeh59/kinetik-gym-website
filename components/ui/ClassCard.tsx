import Image from "next/image";
import type { GymClass } from "@/data/content";
import CircleButton from "@/components/ui/CircleButton";
import styles from "./ClassCard.module.css";

type Props = {
  cls: GymClass;
  /** when given, the card opens a detail view instead of linking to /classes */
  onSelect?: (cls: GymClass) => void;
  className?: string;
};

export default function ClassCard({ cls, onSelect, className = "" }: Props) {
  return (
    <li className={`${styles.card} ${className}`} data-tone={cls.tone} data-card="">
      <div className={styles.photo}>
        <Image src={cls.image} alt={`${cls.name} class`} fill sizes="(max-width: 768px) 75vw, 28vw" draggable={false} />
        <span className={styles.chip}>{cls.category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={`${styles.name} display`}>{cls.name}</h3>
        <div className={styles.foot}>
          <p className={styles.meta}>
            {cls.duration}
            <span aria-hidden="true"> · </span>
            {cls.level}
          </p>
          {onSelect ? (
            <CircleButton label={`More about ${cls.name}`} className={styles.circle} onClick={() => onSelect(cls)} />
          ) : (
            <CircleButton label={`See ${cls.name} in the timetable`} href="/timetable" className={styles.circle} />
          )}
        </div>
      </div>
    </li>
  );
}
