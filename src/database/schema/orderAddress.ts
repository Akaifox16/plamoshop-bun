import { relations } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { orders } from "./order";
import { address } from "./address";

export const shippedAddress = table(
  "orderShippedAddresses",
  {
    oid: t.text("order_id").notNull().references(() => orders.oid),
    aid: t.text("shipped_address_id").notNull().references(() => address.addressId),
    ...timestamps,
  },
  (table) => {
    return {
      pk: t.primaryKey({ columns: [table.oid, table.aid] })
    };
  },
);

export const shippedAddressRelations = relations(shippedAddress, ({ one }) => ({
  order: one(orders, {
    fields: [shippedAddress.oid],
    references: [orders.oid],
  }),
  address: one(address, {
    fields: [shippedAddress.aid],
    references: [address.addressId],
  })
}));


