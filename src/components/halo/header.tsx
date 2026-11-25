import { useEffect, useState } from "react";
import { NAV } from "@/data/event";

export function SiteHeader() {
  const [active, setActive] = useState<string>("night");

  useEffect(() => {
    const nodes = NAV.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 max-w-6xl items-stretch gap-3 px-5 md:px-8">
        <a href="#night" className="flex shrink-0 items-center font-display text-lg font-extrabold tracking-wide">
          HALO
        </a>
        <nav aria-label="Sections" className="nav-scroll flex flex-1 items-stretch gap-1 overflow-x-auto">
          {NAV.map((item) => {
            const on = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={on ? "true" : undefined}
                className={
                  "flex shrink-0 items-center border-b-2 px-3 text-sm font-medium transition-colors duration-200 " +
                  (on ? "border-flame text-paper" : "border-transparent text-mist hover:text-paper")
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
