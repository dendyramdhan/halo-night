import { useMemo, useSyncExternalStore } from "react";
import { EVENT } from "@/data/event";
import { holdServerSnapshot, holdSnapshot, parseHold, seatsOpen, subscribeHold } from "@/lib/holds";
import { Agenda } from "@/components/halo/agenda";
import { Countdown } from "@/components/halo/countdown";
import { SiteHeader } from "@/components/halo/header";
import { Rsvp } from "@/components/halo/rsvp";
import { Speakers } from "@/components/halo/speakers";
import { Tickets } from "@/components/halo/tickets";
import { Venue } from "@/components/halo/venue";

export function HaloPage() {
  const raw = useSyncExternalStore(subscribeHold, holdSnapshot, holdServerSnapshot);
  const hold = useMemo(() => parseHold(raw), [raw]);
  const open = seatsOpen(hold);

  return (
    <>
      <SiteHeader />
      <main>
        <section id="night" className="relative scroll-mt-20 overflow-hidden bg-ink">
          <div className="pointer-events-none absolute -top-24 right-[-6rem] size-[28rem] rounded-full border border-gold/50 md:right-[-2rem]" />
          <div className="pointer-events-none absolute -top-8 right-[-2rem] size-72 rounded-full border-8 border-flame md:right-12" />
          <div className="pointer-events-none absolute top-16 right-16 size-40 rounded-full bg-flame/20 md:right-28" />
          <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pt-24 pb-12 md:px-8 md:pb-16">
            <p className="text-sm font-semibold tracking-widest text-gold uppercase">{EVENT.dateLabel}</p>
            <h1 className="mt-3 max-w-4xl text-7xl font-extrabold md:text-9xl">HALO</h1>
            <p className="mt-4 max-w-xl text-xl text-paper md:text-2xl">{EVENT.lede}</p>
            <p className="mt-3 text-mist">
              {EVENT.venue} · {EVENT.place} · {EVENT.doors}
            </p>
            <p className="mt-2 text-sm font-medium text-gold">{open} of 420 seats still open</p>
            <div className="max-w-xl">
              <Countdown />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#rsvp"
                className="inline-flex min-h-11 items-center rounded-full bg-paper px-5 text-sm font-semibold text-ink"
              >
                Reserve a seat
              </a>
              <a
                href="#agenda"
                className="inline-flex min-h-11 items-center rounded-full border border-paper/30 px-5 text-sm font-semibold text-paper"
              >
                See the night
              </a>
            </div>
          </div>
        </section>
        <Agenda />
        <Speakers />
        <Tickets hold={hold} />
        <Venue />
        <Rsvp hold={hold} />
      </main>
      <footer className="border-t border-line px-5 py-8 text-sm text-mist md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg text-paper">HALO</p>
          <p>
            {EVENT.dateLabel} · {EVENT.venue} · {open} seats open
          </p>
        </div>
      </footer>
    </>
  );
}
