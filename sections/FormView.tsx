"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import type { FormConfig } from "@/data/forms";
import SplitReveal from "@/components/ui/SplitReveal";
import Button from "@/components/ui/Button";
import styles from "./FormView.module.css";

type Errors = Record<string, string>;

const validate = (config: FormConfig, data: FormData): Errors => {
  const errors: Errors = {};
  for (const f of config.fields) {
    const value = String(data.get(f.name) ?? "").trim();
    if (f.required && !value) {
      errors[f.name] = "This field is required";
      continue;
    }
    if (value && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[f.name] = "Enter a valid email address";
    if (value && f.type === "tel" && value.replace(/\D/g, "").length < 7) errors[f.name] = "Enter a valid phone number";
    if (value && f.type === "date" && new Date(value) < new Date(new Date().toDateString())) errors[f.name] = "Pick a date in the future";
  }
  return errors;
};

/** Front-end only: validates, then shows a success screen. Nothing is sent anywhere. */
export default function FormView({ config }: { config: FormConfig }) {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = validate(config, data);
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      gsap.fromTo(card.current, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      return;
    }
    setSentTo(String(data.get("name") ?? "").split(" ")[0] || "friend");
  };

  // success panel pops in
  useGSAP(
    () => {
      if (sentTo) gsap.from("[data-done]", { y: 40, autoAlpha: 0, duration: 0.9, ease: "power4.out", stagger: 0.1 });
    },
    { scope: root, dependencies: [sentTo] }
  );

  return (
    <section ref={root} className={styles.section} data-theme={config.tone === "yellow" ? "yellow" : "light"} data-tone={config.tone}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{config.eyebrow}</p>
        <SplitReveal as="h1" className={`${styles.title} display`}>
          {config.title}
        </SplitReveal>
        <SplitReveal as="p" className={styles.blurb} delay={0.1}>
          {config.blurb}
        </SplitReveal>
      </div>

      <div ref={card} className={styles.card}>
        {sentTo ? (
          <div className={styles.done}>
            <p data-done="" className={styles.check} aria-hidden="true">
              ✓
            </p>
            <h2 data-done="" className={`${styles.doneTitle} display`}>
              Thank you, {sentTo}!
            </h2>
            <p data-done="">{config.success}</p>
            <p data-done="" className={styles.demo}>
              This is a demo site, so nothing was actually sent.
            </p>
            <div data-done="" className={styles.doneActions}>
              <Button href="/" variant="dark">
                Back home
              </Button>
              <Button variant="outline" onClick={() => setSentTo(null)}>
                Send another
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className={styles.form}>
            {config.fields.map((f) => {
              const id = `${config.slug}-${f.name}`;
              const err = errors[f.name];
              const common = {
                id,
                name: f.name,
                required: f.required,
                "aria-invalid": err ? true : undefined,
                "aria-describedby": err ? `${id}-err` : undefined,
                className: styles.input,
              };
              return (
                <div key={f.name} className={`${styles.field} ${f.type === "textarea" ? styles.wide : ""}`}>
                  <label htmlFor={id} className={styles.label}>
                    {f.label}
                    {f.required && <span aria-hidden="true"> *</span>}
                  </label>
                  {f.type === "select" ? (
                    <select {...common} defaultValue="">
                      <option value="" disabled>
                        Select…
                      </option>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea {...common} rows={4} />
                  ) : (
                    <input {...common} type={f.type} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : f.name === "name" ? "name" : "off"} />
                  )}
                  {err && (
                    <p id={`${id}-err`} className={styles.error} role="alert">
                      {err}
                    </p>
                  )}
                </div>
              );
            })}

            <div className={`${styles.actions} ${styles.wide}`}>
              <Button type="submit" variant="dark">
                {config.submit}
              </Button>
              <p className={styles.fine}>
                By continuing you agree to our{" "}
                <Link href="/privacy-policy" prefetch={false}>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
