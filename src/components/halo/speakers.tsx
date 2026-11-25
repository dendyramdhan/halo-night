import { SPEAKERS } from "@/data/event";

export function Speakers() {
  return (
    <section id="speakers" className="scroll-mt-20 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">03 — Speakers</p>
        <h2 className="mt-3 max-w-xl text-4xl md:text-6xl">Six people, one night.</h2>
        <p className="mt-4 max-w-xl text-lg text-mist">
          A lighting designer, a selector, a chef, an architect, a band, and a trio that asks you to be quiet.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SPEAKERS.map((speaker) => (
            <article key={speaker.name} className="flex flex-col rounded-card border border-line bg-ink-2 p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-4xl text-flame" aria-hidden>
                  {speaker.mark}
                </span>
                <time className="text-sm font-medium text-gold tabular-nums" dateTime={`2026-12-12T${speaker.time}`}>
                  {speaker.time}
                </time>
              </div>
              <h3 className="mt-8 text-2xl text-paper">{speaker.name}</h3>
              <p className="mt-1 text-sm font-semibold tracking-wide text-gold uppercase">{speaker.role}</p>
              <p className="mt-4 font-display text-xl text-paper">{speaker.piece}</p>
              <p className="mt-2 text-mist">{speaker.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
