"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollableTable({ labelId, children }: { labelId: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setScrollable(element.scrollWidth > element.clientWidth + 1);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="table-scroll" tabIndex={scrollable ? 0 : undefined} aria-labelledby={scrollable ? labelId : undefined}>{children}</div>;
}
