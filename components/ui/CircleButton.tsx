import Link from "next/link";
import type { MouseEventHandler } from "react";
import styles from "./CircleButton.module.css";

type Props = {
  /** omit `href` and pass `onClick` to render a real <button> */
  href?: string;
  label: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

const arrow = (
  <span className={styles.icons}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </span>
);

export default function CircleButton({ href, label, className = "", onClick }: Props) {
  const cls = `${styles.circle} ${className}`;
  if (!href) {
    return (
      <button type="button" className={cls} aria-label={label} onClick={onClick}>
        {arrow}
      </button>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link className={cls} href={href} prefetch={false} aria-label={label} onClick={onClick}>
        {arrow}
      </Link>
    );
  }
  return (
    <a className={cls} href={href} aria-label={label} onClick={onClick}>
      {arrow}
    </a>
  );
}
