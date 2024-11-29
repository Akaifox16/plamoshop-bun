import { relations } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { address } from "./address";

export const customers = table(
  "customers",
  {
    cid: t.text("customer_id").primaryKey(),
    fname: t.text("customer_fname").notNull(),
    lname: t.text("customer_lname").notNull(),
    phone: t.text().notNull(),
    ...timestamps,
  },
  (table) => {
    return {
      cidIndex: t.uniqueIndex("cid_idx").on(table.cid)
    };
  },
);

export const customersRelations = relations(customers, ({ many }) => ({
  adresses: many(address),
}));
