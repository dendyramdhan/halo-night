import { TIERS, formatIdr, type TierId } from "@/data/event";
import { seatsLeft, type Hold } from "@/lib/holds";

function leftLabel(left: number, cap: number): string {
  if (left === 0) return "Sold out";
  if (left <= 12) return `Only ${left} left`;
  return `${left} of ${cap} open`;
}

export function Tickets({ hold }: { hold: Hold | null }) {
  function pick(tier: TierId) {
    window.dispatchEvent(new CustomEvent("halo-pick-tier", { detail: tier }));
  }

  return (
    <section id="tickets" className="scroll-mt-20 bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm font-semibold tracking-widest text-ember uppercase">04 — Tickets</p>
        <h2 className="mt-3 max-w-xl text-4xl text-ink md:text-6xl">Three ways into the room.</h2>
        <p className="mt-4 max-w-xl text-lg text-soot">
          The warehouse holds 420. A hold you make here stays on this device and comes off the count.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => {
            const left = seatsLeft(tier.id, hold);
            const taken = tier.cap - left;
            const width = Math.min(100, Math.round((taken / tier.cap) * 100));
            const mine = hold?.tier === tier.id;
            const tight = left > 0 && left <= 12;
            return (
              <article
                key={tier.id}
                className={
                  "flex flex-col rounded-card border bg-paper p-6 " +
                  (tier.id === "patron" ? "border-ember" : "border-ink/10")
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-3xl text-ink">{tier.name}</h3>
                  <span
                    className={
                      "rounded-full px-3 py-1 text-xs font-semibold " +
                      (left === 0 ? "bg-ink text-paper" : tight ? "bg-flame text-ink" : "bg-ink/10 text-ink")
                    }
                  >
                    {leftLabel(left, tier.cap)}
                  </span>
                </div>
                <p className="mt-4 font-display text-3xl text-ink tabular-nums">{formatIdr(tier.price)}</p>
                <p className="mt-3 text-soot">{tier.summary}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-ink/10"
                    role="meter"
                    aria-valuemin={0}
                    aria-valuemax={tier.cap}
                    aria-valuenow={taken}
                    aria-label={`${tier.name} seats claimed`}
                  >
                    <div className="h-full rounded-full bg-ember" style={{ width: `${width}%` }} />
                  </div>
                  <p className="mt-2 text-sm text-soot">
                    {taken} claimed of {tier.cap}
                    {mine ? ` · your hold is ${hold.party}` : ""}
                  </p>
                </div>
                <a
                  href="#rsvp"
                  onClick={() => pick(tier.id)}
                  className={
                    "mt-6 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold " +
                    (left === 0 ? "pointer-events-none bg-ink/10 text-soot" : "bg-ink text-paper")
                  }
                  aria-disabled={left === 0}
                >
                  {left === 0 ? "No seats left" : `Hold ${tier.name}`}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
