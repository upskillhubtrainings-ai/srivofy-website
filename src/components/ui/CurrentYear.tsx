"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, read in the browser so static builds never show a stale year. */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => null);
  return <span>{year}</span>;
}
