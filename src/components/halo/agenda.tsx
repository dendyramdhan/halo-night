import { AGENDA } from "@/data/event";

export function Agenda() {
  return (
    <section id="agenda" className="scroll-mt-20 bg-ink-2">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">02 — Agenda</p>
        <h2 className="mt-3 max-w-xl text-4xl md:text-6xl">From lamps to the water.</h2>
        <p className="mt-4 max-w-xl text-lg text-mist">
          One room, one night. Talks stay short so the table and the band get the hours.
        </p>
        <ol className="mt-10 divide-y divide-line border-y border-line">
          {AGENDA.map((item) => (
            <li key={item.time} className="grid gap-2 py-6 md:grid-cols-[7rem_1fr_auto] md:items-start md:gap-8">
              <time className="font-display text-2xl text-gold tabular-nums" dateTime={`2026-12-12T${item.time}`}>
                {item.time}
              </time>
              <div>
                <h3 className="text-2xl text-paper">{item.title}</h3>
                <p className="mt-2 max-w-xl text-mist">{item.detail}</p>
              </div>
              <p className="text-sm font-medium text-paper md:pt-2 md:text-right">{item.where}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
