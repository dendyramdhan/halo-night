import { useEffect, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { TIERS, formatIdr, tierById, type TierId } from "@/data/event";
import { clearHold, makeCode, seatsLeft, seatsOpen, writeHold, type Hold } from "@/lib/holds";

type Draft = {
  name: string;
  email: string;
  tier: TierId;
  party: number;
  note: string;
};

const EMPTY: Draft = { name: "", email: "", tier: "table", party: 2, note: "" };

const fieldClass =
  "w-full rounded-2xl border border-line bg-ink px-4 py-3 text-paper placeholder:text-mist";

function isTier(value: unknown): value is TierId {
  return value === "floor" || value === "table" || value === "patron";
}

export function Rsvp({ hold }: { hold: Hold | null }) {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const onPick = (event: Event) => {
      const tier = (event as CustomEvent<unknown>).detail;
      if (!isTier(tier)) return;
      setDraft((current) => ({ ...current, tier }));
    };
    window.addEventListener("halo-pick-tier", onPick);
    return () => window.removeEventListener("halo-pick-tier", onPick);
  }, []);

  function release() {
    if (!hold) return;
    setDraft({
      name: hold.name,
      email: hold.email,
      tier: hold.tier,
      party: hold.party,
      note: hold.note,
    });
    clearHold();
    setErrors({});
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    const name = draft.name.trim();
    const email = draft.email.trim();
    if (name.length < 2) next.name = "Tell us the name for the door.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email doesn’t look complete.";
    if (draft.note.trim().length > 180) next.note = "Keep the note under 180 characters.";
    const left = seatsLeft(draft.tier, null);
    if (left < draft.party) {
      const label = tierById(draft.tier).name.toLowerCase();
      next.tier = left === 0 ? "That tier is full." : `Only ${left} ${label} seats left.`;
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    writeHold({
      name,
      email,
      tier: draft.tier,
      party: draft.party,
      note: draft.note.trim(),
      code: makeCode(),
    });
  }

  return (
    <section id="rsvp" className="scroll-mt-20 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_1.1fr] md:px-8 md:py-24">
        <div>
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">06 — RSVP</p>
          <h2 className="mt-3 text-4xl md:text-6xl">Hold a seat before the lane fills.</h2>
          <p className="mt-4 text-lg text-mist">
            {seatsOpen(hold)} seats still open of 420. Your hold is saved on this device — bring the code to
            the gate.
          </p>
        </div>
        {hold ? <Confirmation hold={hold} onRelease={release} /> : (
          <form onSubmit={submit} className="rounded-card border border-line bg-ink-2 p-5 md:p-6" noValidate>
            <div className="grid gap-4">
              <label className="block text-sm font-medium text-mist">
                Name
                <input
                  id="rsvp-name"
                  className={"mt-2 " + fieldClass}
                  value={draft.name}
                  autoComplete="name"
                  onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                />
                {errors.name ? <span className="mt-2 block text-flame">{errors.name}</span> : null}
              </label>
              <label className="block text-sm font-medium text-mist">
                Email
                <input
                  id="rsvp-email"
                  type="email"
                  className={"mt-2 " + fieldClass}
                  value={draft.email}
                  autoComplete="email"
                  onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                />
                {errors.email ? <span className="mt-2 block text-flame">{errors.email}</span> : null}
              </label>
              <fieldset>
                <legend className="text-sm font-medium text-mist">Tier</legend>
                <div className="mt-2 grid gap-2">
                  {TIERS.map((tier) => {
                    const left = seatsLeft(tier.id, null);
                    const selected = draft.tier === tier.id;
                    return (
                      <label
                        key={tier.id}
                        className={
                          "flex min-h-11 items-center justify-between gap-3 rounded-2xl border px-4 py-3 " +
                          (left === 0 ? "cursor-not-allowed opacity-50 " : "") +
                          (selected ? "border-flame bg-flame/10" : "border-line bg-ink")
                        }
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="tier"
                            className="size-4 accent-flame"
                            checked={selected}
                            disabled={left === 0}
                            onChange={() => setDraft({ ...draft, tier: tier.id })}
                          />
                          <span className="font-medium text-paper">{tier.name}</span>
                        </span>
                        <span className="text-right text-sm text-mist">
                          {formatIdr(tier.price)}
                          <span className="block">{left === 0 ? "Sold out" : `${left} left`}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.tier ? <span className="mt-2 block text-sm text-flame">{errors.tier}</span> : null}
              </fieldset>
              <fieldset>
                <legend className="text-sm font-medium text-mist">Party size</legend>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((count) => {
                    const on = draft.party === count;
                    return (
                      <button
                        key={count}
                        type="button"
                        aria-pressed={on}
                        className={
                          "min-h-11 rounded-2xl text-sm font-semibold " +
                          (on ? "bg-flame text-ink" : "border border-line bg-ink text-paper")
                        }
                        onClick={() => setDraft({ ...draft, party: count })}
                      >
                        {count}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <label className="block text-sm font-medium text-mist">
                Note, optional
                <textarea
                  id="rsvp-note"
                  rows={3}
                  className={"mt-2 " + fieldClass}
                  placeholder="Allergies, a plus-one name, or nothing."
                  value={draft.note}
                  onChange={(event) => setDraft({ ...draft, note: event.target.value })}
                />
                {errors.note ? <span className="mt-2 block text-flame">{errors.note}</span> : null}
              </label>
              <button
                type="submit"
                className="min-h-11 rounded-full bg-flame px-5 text-sm font-semibold text-ink"
              >
                Hold my seats
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Confirmation({ hold, onRelease }: { hold: Hold; onRelease: () => void }) {
  const tier = tierById(hold.tier);
  const seats = hold.party === 1 ? "1 seat" : `${hold.party} seats`;
  return (
    <div className="rounded-card border border-flame bg-ink-2 p-6" role="status">
      <div className="flex size-12 items-center justify-center rounded-full bg-flame text-ink">
        <Check className="size-6" aria-hidden />
      </div>
      <h3 className="mt-5 text-3xl text-paper">You’re on the list.</h3>
      <p className="mt-3 text-lg text-paper">
        {hold.name}, you’re holding {seats} on {tier.name}.
      </p>
      <p className="mt-6 font-display text-4xl tracking-wide text-gold tabular-nums">{hold.code}</p>
      <p className="mt-3 text-mist">
        Show this code at the gate. It’s saved on this device for {hold.email}.
        {hold.note ? ` Note: ${hold.note}` : ""}
      </p>
      <button
        type="button"
        onClick={onRelease}
        className="mt-6 min-h-11 rounded-full border border-line px-5 text-sm font-semibold text-paper"
      >
        Change hold
      </button>
      <p className="mt-3 text-sm text-mist">Changing releases the seats until you save again.</p>
    </div>
  );
}
