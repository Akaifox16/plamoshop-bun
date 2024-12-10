import { relations, sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { products } from "./product";

export const orderDetails = table(
  "orderDetails",
  {
    oid: t.text("order_id").notNull(),
    pid: t.text("product_id").notNull(),
    amount: t.integer(),
    ...timestamps,
  },
  (table) => {
    return {
      pk: t.primaryKey({ columns: [table.oid, table.pid] }),
      buyQtyCheck: t.check('buy_quantity_check', sql`${table.amount} >= 0`),
    };
  },
);

export const ordersDetailRelations = relations(orderDetails, ({ one }) => ({
  product: one(products, {
    fields: [orderDetails.pid],
    references: [products.productId],
  })
}));
