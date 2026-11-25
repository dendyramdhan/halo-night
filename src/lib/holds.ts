import { TIERS, tierById, type TierId } from "@/data/event";

export const HOLD_KEY = "halo-night-hold";
const HOLD_EVENT = "halo-hold-change";

export type Hold = {
  name: string;
  email: string;
  tier: TierId;
  party: number;
  note: string;
  code: string;
};

const TIER_IDS = new Set<TierId>(["floor", "table", "patron"]);

function isHold(value: unknown): value is Hold {
  if (!value || typeof value !== "object") return false;
  const hold = value as Hold;
  return (
    typeof hold.name === "string" &&
    typeof hold.email === "string" &&
    typeof hold.code === "string" &&
    typeof hold.note === "string" &&
    typeof hold.party === "number" &&
    TIER_IDS.has(hold.tier)
  );
}

export function parseHold(raw: string | null): Hold | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isHold(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function seatsLeft(tier: TierId, hold: Hold | null): number {
  const spec = tierById(tier);
  const mine = hold?.tier === tier ? hold.party : 0;
  return Math.max(0, spec.cap - spec.held - mine);
}

export function seatsOpen(hold: Hold | null): number {
  return TIERS.reduce((sum, tier) => sum + seatsLeft(tier.id, hold), 0);
}

export function subscribeHold(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(HOLD_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(HOLD_EVENT, handler);
  };
}

export function holdSnapshot(): string | null {
  return localStorage.getItem(HOLD_KEY);
}

export function holdServerSnapshot(): null {
  return null;
}

export function writeHold(hold: Hold): void {
  localStorage.setItem(HOLD_KEY, JSON.stringify(hold));
  window.dispatchEvent(new Event(HOLD_EVENT));
}

export function clearHold(): void {
  localStorage.removeItem(HOLD_KEY);
  window.dispatchEvent(new Event(HOLD_EVENT));
}

export function makeCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  let body = "";
  for (const byte of bytes) body += alphabet[byte % alphabet.length];
  return `HALO-${body}`;
}
