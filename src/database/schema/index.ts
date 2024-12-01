import { address } from "./address";
import { customers } from "./customer";
import { employees } from "./employee";
import { logins } from "./login";
import { offices } from "./offices";
import { products } from "./product";
import { productLines } from "./productLine";

export const table = {
  address,
  customers,
  employees,
  logins,
  offices,
  products,
  productLines,
} as const

export type Table = typeof table

export {
  address,
  customers,
  employees,
  logins,
  offices,
  products,
  productLines,
}
