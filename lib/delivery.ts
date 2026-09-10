import type { AddressType } from "@/lib/types";

export interface SavedAddress {
  id: string;
  label: string;
  type: AddressType;
  recipient: string;
  phone: string;
  street: string;
  barangay: string;
  city: string;
  instructions?: string;
}

export const SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "home",
    label: "Home",
    type: "home",
    recipient: "Mara Villanueva",
    phone: "0917 812 4455",
    street: "24 Rizal Street",
    barangay: "Quezon",
    city: "San Isidro, Isabela",
    instructions: "Blue gate beside the sari-sari store — leave with Aling Rosa if I'm out.",
  },
  {
    id: "work",
    label: "Work",
    type: "work",
    recipient: "Mara Villanueva",
    phone: "0917 812 4455",
    street: "2F Northpoint Building, Maharlika Highway",
    barangay: "District 2",
    city: "Cauayan City, Isabela",
    instructions: "Text on arrival — I'll come down to the lobby.",
  },
];

export const DEFAULT_ADDRESS_ID = "home";

export function getAddress(id: string): SavedAddress | undefined {
  return SAVED_ADDRESSES.find((a) => a.id === id);
}

export function shortZone(address: SavedAddress): string {
  const town = address.city.replace(/,\s*Isabela$/, "").replace(/ City$/, "");
  return `${address.barangay}, ${town}`;
}
