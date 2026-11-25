import { useEffect, useState } from "react";
import { EVENT_START } from "@/data/event";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

type Part = { label: string; value: number };

function parts(target: number, now: number): Part[] | null {
  const diff = target - now;
  if (diff <= 0) return null;
  return [
    { label: "Days", value: Math.floor(diff / DAY) },
    { label: "Hours", value: Math.floor((diff % DAY) / HOUR) },
    { label: "Minutes", value: Math.floor((diff % HOUR) / MINUTE) },
    { label: "Seconds", value: Math.floor((diff % MINUTE) / SECOND) },
  ];
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function Countdown() {
  const target = EVENT_START.getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = parts(target, now);

  if (!units) {
    return (
      <p className="mt-8 rounded-card bg-flame px-6 py-5 font-display text-3xl text-ink" role="status">
        Doors are open.
      </p>
    );
  }

  const summary = units.map((unit) => `${unit.value} ${unit.label.toLowerCase()}`).join(", ");

  return (
    <div
      className="mt-8 grid grid-cols-4 overflow-hidden rounded-card bg-flame text-ink"
      role="timer"
      aria-label={`Doors open in ${summary}`}
    >
      {units.map((unit, index) => (
        <div
          key={unit.label}
          className={
            "px-2 py-4 text-center md:py-5 " + (index < units.length - 1 ? "border-r border-ink/15" : "")
          }
        >
          <div className="font-display text-3xl tabular-nums md:text-5xl" suppressHydrationWarning>
            {pad(unit.value)}
          </div>
          <div className="mt-1 text-xs font-semibold tracking-widest uppercase">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
