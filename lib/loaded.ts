/**
 * Coordination between the page loader and everything that animates on entry.
 *
 * The loader sets `<html data-loaded="true">` and fires `kinetik:loaded` the moment its
 * curtain starts lifting. Entrance animations wait for that so they play in view instead
 * of behind the loader. After the first load (and on client-side navigation) the flag is
 * already set, so callbacks run immediately.
 */
export const LOADED_EVENT = "kinetik:loaded";

export const isLoaded = () => typeof document !== "undefined" && document.documentElement.dataset.loaded === "true";

export function markLoaded() {
  document.documentElement.dataset.loaded = "true";
  window.dispatchEvent(new Event(LOADED_EVENT));
}

/** Runs `cb` once the loader is done (immediately if it already is). Returns a cancel function. */
export function onceLoaded(cb: () => void): () => void {
  if (isLoaded()) {
    cb();
    return () => {};
  }
  let cancelled = false;
  const handler = () => {
    if (!cancelled) cb();
  };
  window.addEventListener(LOADED_EVENT, handler, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener(LOADED_EVENT, handler);
  };
}
