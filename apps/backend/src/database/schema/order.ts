import { relations } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { customers } from "./customer";
import { shippedAddress } from "./orderAddress";

export const orders = table(
  "orders",
  {
    oid: t.text("order_id").primaryKey(),
    cid: t.text('customer_id').references(() => customers.cid),
    address: t.text('address_id').notNull(),
    requiredDate: t.text('required_date').notNull(),
    shippedDate: t.text('shipped_date').notNull(),
    status: t.text({ enum: ['LISTED', 'PROCESSING', 'SHIPPED'] }),
    comments: t.text(),
    ...timestamps,
  },
  (table) => {
    return {
      oidIndex: t.uniqueIndex("oid_idx").on(table.oid)
    };
  },
);

export const ordersRelations = relations(orders, ({ one }) => ({
  customer: one(customers, {
    fields: [orders.cid],
    references: [customers.cid],
  }),
  shippedAddress: one(shippedAddress, {
    relationName: 'shippedAddress',
    fields: [orders.address],
    references: [shippedAddress.aid],
  })
}));

