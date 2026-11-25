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

const PLACEHOLDER: Part[] = [
  { label: "Days", value: 0 },
  { label: "Hours", value: 0 },
  { label: "Minutes", value: 0 },
  { label: "Seconds", value: 0 },
];

export function Countdown() {
  const target = EVENT_START.getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = now === null ? PLACEHOLDER : parts(target, now);

  if (now !== null && units === null) {
    return (
      <p className="mt-8 rounded-card bg-flame px-6 py-5 font-display text-3xl text-ink" role="status">
        Doors are open.
      </p>
    );
  }

  const shown = units ?? PLACEHOLDER;
  const summary = shown.map((unit) => `${unit.value} ${unit.label.toLowerCase()}`).join(", ");

  return (
    <div
      className="mt-8 grid grid-cols-4 overflow-hidden rounded-card bg-flame text-ink"
      role="timer"
      aria-label={now === null ? "Countdown to doors" : `Doors open in ${summary}`}
    >
      {shown.map((unit, index) => (
        <div
          key={unit.label}
          className={
            "px-2 py-4 text-center md:py-5 " + (index < shown.length - 1 ? "border-r border-ink/15" : "")
          }
        >
          <div className="font-display text-3xl tabular-nums md:text-5xl">
            {now === null ? "--" : unit.label === "Days" ? String(unit.value) : pad(unit.value)}
          </div>
          <div className="mt-1 text-xs font-semibold tracking-widest uppercase">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
