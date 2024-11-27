import { address } from "./address";
import { customers } from "./customer";

export const table = {
  address,
  customers,
} as const

export type Table = typeof table
