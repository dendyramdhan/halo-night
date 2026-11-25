type Zone = {
  name: string;
  detail: string;
  className: string;
  hot?: boolean;
};

const ZONES: Zone[] = [
  { name: "Courtyard", detail: "Lanterns at arrival", className: "col-span-8" },
  { name: "Gate", detail: "Codes checked here", className: "col-span-4", hot: true },
  { name: "Main hall", detail: "Stage on the north wall", className: "col-span-8 row-span-2 min-h-48" },
  { name: "Listening room", detail: "Trio from 21:15", className: "col-span-4" },
  { name: "Bar", detail: "Last call 22:00", className: "col-span-4" },
  { name: "Long table", detail: "Supper from 19:20", className: "col-span-12", hot: true },
];

export function Venue() {
  return (
    <section id="venue" className="scroll-mt-20 bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-start md:px-8 md:py-24">
        <div>
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">05 — Venue</p>
          <h2 className="mt-3 text-4xl md:text-6xl">Gudang Empat</h2>
          <p className="mt-4 text-lg text-mist">
            A former copra store, one lane in from the Sunda Kelapa water. You hear the band before you see
            the door.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-semibold tracking-widest text-gold uppercase">Address</dt>
              <dd className="mt-1 text-paper">Jalan Kali Besar Timur, Sunda Kelapa, Jakarta</dd>
            </div>
            <div>
              <dt className="font-semibold tracking-widest text-gold uppercase">Doors</dt>
              <dd className="mt-1 text-paper">Saturday 12 December 2026, 17:30 WIB. Close at 23:00.</dd>
            </div>
            <div>
              <dt className="font-semibold tracking-widest text-gold uppercase">Getting there</dt>
              <dd className="mt-1 text-paper">
                The lane is walk-only after 17:00. Drop off at the Kali Besar corner and follow the lamps.
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <p className="text-sm text-mist">
            Room plan, not a street map. Printed copies wait at the gate so you know where to walk.
          </p>
          <div className="mt-4 grid grid-cols-12 gap-2" role="img" aria-label="Site plan of Gudang Empat">
            {ZONES.map((zone) => (
              <div
                key={zone.name}
                className={
                  "flex min-h-24 flex-col justify-between rounded-card border p-4 " +
                  (zone.hot ? "border-flame bg-flame/10 " : "border-line bg-ink-3 ") +
                  zone.className
                }
              >
                <span className="font-display text-lg text-paper">{zone.name}</span>
                <span className="text-sm text-mist">{zone.detail}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-mist">
            <span className="h-px flex-1 bg-gold/60" aria-hidden />
            <span>Water, one lane south</span>
            <span className="h-px flex-1 bg-gold/60" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
