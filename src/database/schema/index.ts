import { address } from "./address";
import { customers } from "./customer";
import { employees } from "./employee";
import { logins } from "./login";
import { offices } from "./offices";
import { orders } from "./order";
import { shippedAddress } from "./orderAddress";
import { orderDetails } from "./orderDetail";
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
  orders,
  orderDetails,
  shippedAddress,
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
  orders,
  orderDetails,
  shippedAddress,
}
