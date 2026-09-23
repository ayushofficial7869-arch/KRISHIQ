export interface MandiOption {
  name: string;
  price: number;
  distance: string;
  net: number;
  note: string;
}

export interface PoolOption {
  id: number;
  crop: string;
  grade: string;
  qty: number;
  status: "forming" | "matched";
  buyer: string;
}

export interface OfferOption {
  id: number;
  buyer: string;
  price: number;
  status: "pending" | "accepted" | "rejected";
  payment: "not_started" | "pending" | "paid";
}

export const mandis: MandiOption[] = [
  {
    name: "Nagpur Mandi",
    price: 4720,
    distance: "14 km",
    net: 4575,
    note: "Top net choice — closest distance minimizes per-trip freight.",
  },
  {
    name: "Wardha Mandi",
    price: 4630,
    distance: "72 km",
    net: 4410,
    note: "Lower modal rate and additional transit distance cut into returns.",
  },
  {
    name: "Amravati Mandi",
    price: 4760,
    distance: "155 km",
    net: 4380,
    note: "Higher modal headline price, but 155 km freight eats the margin.",
  },
  {
    name: "Akola Mandi",
    price: 4680,
    distance: "245 km",
    net: 4210,
    note: "Not viable for solo small lots due to high long-haul freight.",
  },
];

export const pools: PoolOption[] = [
  {
    id: 1,
    crop: "Soybean",
    grade: "B (Standard)",
    qty: 75,
    status: "matched",
    buyer: "Vidarbha Agro Processing (Min 60 qtl)",
  },
  {
    id: 2,
    crop: "Cotton",
    grade: "A (Premium)",
    qty: 147,
    status: "forming",
    buyer: "Reaching AgriCorp Institutional (Needs 150 qtl)",
  },
];

export const offers: OfferOption[] = [
  {
    id: 1,
    buyer: "Vidarbha Agro Processing",
    price: 4820,
    status: "accepted",
    payment: "paid",
  },
  {
    id: 2,
    buyer: "Nagpur Oil Mills",
    price: 4790,
    status: "pending",
    payment: "not_started",
  },
  {
    id: 3,
    buyer: "Local Mandi Aggregator",
    price: 4650,
    status: "rejected",
    payment: "not_started",
  },
];