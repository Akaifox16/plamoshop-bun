import { address } from "./address";
import { customers } from "./customer";
import { employees } from "./employee";
import { logins } from "./login";
import { offices } from "./offices";

export const table = {
  address,
  customers,
  employees,
  logins,
  offices,
} as const

export type Table = typeof table

export {
  address,
  customers,
  employees,
  logins,
  offices,
}
