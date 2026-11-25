export const EVENT = {
  name: "HALO",
  lede: "One night of sound, light, and a long table.",
  dateLabel: "Saturday 12 December 2026",
  doors: "Doors 17:30 WIB",
  venue: "Gudang Empat",
  place: "Sunda Kelapa, Jakarta",
  capacity: 420,
};

export const EVENT_START = new Date("2026-12-12T17:30:00+07:00");

export type TierId = "floor" | "table" | "patron";

export type Tier = {
  id: TierId;
  name: string;
  price: number;
  cap: number;
  held: number;
  summary: string;
  perks: string[];
};

export const TIERS: Tier[] = [
  {
    id: "floor",
    name: "Floor",
    price: 185_000,
    cap: 280,
    held: 214,
    summary: "Standing in the hall and the courtyard. Supper is a plate, not a seat.",
    perks: ["Hall and courtyard", "One supper plate", "Lantern walk"],
  },
  {
    id: "table",
    name: "Table",
    price: 640_000,
    cap: 110,
    held: 86,
    summary: "A seat on the long table. Supper runs the length of the night.",
    perks: ["Reserved seat", "Full supper service", "Courtyard before doors"],
  },
  {
    id: "patron",
    name: "Patron",
    price: 1_450_000,
    cap: 30,
    held: 22,
    summary: "Listening room, a toast with the hosts, and a seat at the table.",
    perks: ["Listening room", "Host toast at 19:00", "Table seat and supper"],
  },
];

export const AGENDA = [
  {
    time: "17:30",
    title: "Doors and courtyard lamps",
    detail: "Arrive while the lane is still blue. Names checked at the gate, lamps lit in the yard.",
    where: "Gate · Courtyard",
  },
  {
    time: "18:15",
    title: "Opening set",
    detail: "Arun Prakoso plays the room in before anyone sits. Low, warm, no speeches yet.",
    where: "Main hall",
  },
  {
    time: "18:45",
    title: "Light as a material",
    detail: "Sari Widjaja on how a lamp can be the architecture. Twenty minutes, then the room changes.",
    where: "Main hall",
  },
  {
    time: "19:20",
    title: "Supper on the long table",
    detail: "Mira Halim sends the first course. Floor guests take a plate; table and patron stay seated.",
    where: "Long table",
  },
  {
    time: "20:10",
    title: "Rooms that listen",
    detail: "Theo Santoso walks the plan of Gudang Empat — why the listening room is a box inside a box.",
    where: "Main hall",
  },
  {
    time: "20:40",
    title: "The Night Current",
    detail: "Lila Hartono and the band. This is the set the night is built around.",
    where: "Main hall",
  },
  {
    time: "21:15",
    title: "Listening room",
    detail: "Bima Siregar’s trio, forty people at a time. Patron seats are held; others queue at the door.",
    where: "Listening room",
  },
  {
    time: "22:00",
    title: "Last call and the lantern walk",
    detail: "Out through the courtyard, down the lane, and to the water. Close at 23:00.",
    where: "Courtyard · water",
  },
];

export const SPEAKERS = [
  {
    name: "Sari Widjaja",
    role: "Lighting",
    piece: "Light as a material",
    time: "18:45",
    note: "Designs rooms by what she refuses to light. HALO is her first night with an audience in the dark.",
    mark: "SW",
  },
  {
    name: "Arun Prakoso",
    role: "Selector",
    piece: "Opening set",
    time: "18:15",
    note: "Plays records like place-settings. Expect gamelan ghosts, slow dub, and one song you already know.",
    mark: "AP",
  },
  {
    name: "Mira Halim",
    role: "Chef",
    piece: "The long table",
    time: "19:20",
    note: "Cooks for a single table of a hundred. The menu follows the tide: grilled, sour, then something cold.",
    mark: "MH",
  },
  {
    name: "Theo Santoso",
    role: "Architect",
    piece: "Rooms that listen",
    time: "20:10",
    note: "Turned Gudang Empat from a copra store into a room that holds a whisper. He will not use slides.",
    mark: "TS",
  },
  {
    name: "Lila Hartono",
    role: "The Night Current",
    piece: "Main set",
    time: "20:40",
    note: "Voice out front, three players behind. They treat a warehouse like a chapel and refuse encores.",
    mark: "LH",
  },
  {
    name: "Bima Siregar",
    role: "Sound",
    piece: "Listening room",
    time: "21:15",
    note: "A trio, no monitors, forty chairs. If you talk, someone will look at you. That is the point.",
    mark: "BS",
  },
];

export const NAV = [
  { id: "night", label: "Night" },
  { id: "agenda", label: "Agenda" },
  { id: "speakers", label: "Speakers" },
  { id: "tickets", label: "Tickets" },
  { id: "venue", label: "Venue" },
  { id: "rsvp", label: "RSVP" },
] as const;

export function formatIdr(amount: number): string {
  const body = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${body}`;
}

export function tierById(id: TierId): Tier {
  const tier = TIERS.find((item) => item.id === id);
  if (!tier) throw new Error(`Unknown tier ${id}`);
  return tier;
}
