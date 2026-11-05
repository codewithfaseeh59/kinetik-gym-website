"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onceLoaded } from "@/lib/loaded";

/**
 * Runs `setup` inside a GSAP context scoped to `scope`, only when the user has
 * not asked for reduced motion, and only once the page loader has finished.
 * Everything created inside is reverted on unmount.
 */
export function useMotion(
  setup: () => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  dependencies: unknown[] = []
) {
  useGSAP(
    () => {
      // scoped to this component's root, so a selector like "[data-row]" can't reach into other sections
      const mm = gsap.matchMedia(scope.current ?? undefined);
      const cancel = onceLoaded(() => {
        mm.add(MOTION_OK, setup);
      });
      return () => {
        cancel();
        mm.revert();
      };
    },
    { scope, dependencies }
  );
}
