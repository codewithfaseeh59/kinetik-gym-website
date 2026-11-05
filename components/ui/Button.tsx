import Link from "next/link";
import type { MouseEventHandler } from "react";
import styles from "./Button.module.css";

type Props = {
  children: string;
  href?: string;
  variant?: "yellow" | "dark" | "light" | "pilates" | "nutrition" | "stream" | "outline";
  size?: "md" | "sm";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
};

export default function Button({
  children,
  href,
  variant = "yellow",
  size = "md",
  className = "",
  type = "button",
  disabled,
  onClick,
}: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  const inner = (
    <>
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </>
  );

  if (href) {
    // internal routes use client-side navigation; "#hash" and external links stay plain anchors
    if (href.startsWith("/")) {
      return (
        <Link className={cls} href={href} prefetch={false} onClick={onClick}>
          {inner}
        </Link>
      );
    }
    return (
      <a className={cls} href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
