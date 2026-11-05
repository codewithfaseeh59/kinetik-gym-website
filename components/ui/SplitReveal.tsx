"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onceLoaded } from "@/lib/loaded";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** split into "lines" (default) or "chars" */
  type?: "lines" | "chars";
  start?: string;
};

/** Text that rises line-by-line (or char-by-char) out of a mask when scrolled into view. */
export default function SplitReveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  type = "lines",
  start = "top 90%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      // wait for the page loader so headings reveal in view, not behind the curtain
      const cancel = onceLoaded(() => {
        gsap.set(el, { visibility: "visible" });
        mm.add(MOTION_OK, () => {
          SplitText.create(el, {
            type: type === "chars" ? "chars,words" : "lines",
            mask: type === "chars" ? undefined : "lines",
            autoSplit: true,
            onSplit(self) {
              const targets = type === "chars" ? self.chars : self.lines;
              return gsap.from(targets, {
                yPercent: 115,
                duration: type === "chars" ? 0.9 : 1.1,
                ease: "power4.out",
                stagger: type === "chars" ? 0.035 : 0.09,
                delay,
                scrollTrigger: { trigger: el, start, once: true },
              });
            },
          });
        });
      });
      return () => {
        cancel();
        mm.revert();
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} data-split="">
      {children}
    </Tag>
  );
}
