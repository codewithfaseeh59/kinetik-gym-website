import styles from "./Logo.module.css";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <svg className={styles.mark} viewBox="0 0 40 40" aria-hidden="true">
        <path d="M4 4h9v13.5L25 4h12L21.5 20 38 36H26L13 22.5V36H4z" fill="currentColor" />
      </svg>
      <span className={styles.word}>KINETIK</span>
    </span>
  );
}
