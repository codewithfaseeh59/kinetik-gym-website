"use client";

import { featuredClasses } from "@/data/content";
import RollingTitle from "@/components/ui/RollingTitle";
import SplitReveal from "@/components/ui/SplitReveal";
import DraggableList from "@/components/ui/DraggableList";
import Button from "@/components/ui/Button";
import ClassCard from "@/components/ui/ClassCard";
import styles from "./Classes.module.css";

export default function Classes() {
  return (
    <section id="classes" className={styles.section} data-theme="dark">
      <div className={styles.title}>
        <RollingTitle text="Classes" repeat={5} duration={36} outline />
      </div>

      <div className={styles.head}>
        <SplitReveal as="p" className={styles.lead}>
          The most exciting classes, created by top instructors. No matter your goal, we can make it happen.
        </SplitReveal>
        <div className={styles.actions}>
          <Button href="/classes" variant="yellow">
            All classes
          </Button>
          <Button href="/timetable" variant="outline">
            See the timetable
          </Button>
        </div>
      </div>

      <DraggableList>
        {featuredClasses.map((c) => (
          <ClassCard key={c.slug} cls={c} />
        ))}
      </DraggableList>
    </section>
  );
}
