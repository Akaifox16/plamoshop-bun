import { relations, sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { productLines } from "./productLine";

export const products = table(
  "products",
  {
    productId: t.text('product_number').primaryKey(),
    productName: t.text('product_name').notNull(),
    productVendor: t.text('product_vendor').notNull(),
    productScale: t.text('product_scale').notNull(),
    stockQuantity: t.integer('stock_quantity').notNull().default(0),
    buyPrice: t.real('buy_price').notNull(),
    price: t.real().notNull(),
    productLine: t.text().notNull(),
    ...timestamps,
  },
  (table) => {
    return {
      priceCheck: t.check('price_check', sql`${table.price} >= 0`),
      buyPriceCheck: t.check('buy_price_check', sql`${table.buyPrice} >= 0`),
      stockCheck: t.check('stock_check', sql`${table.stockQuantity} >= 0`),
      productNumberIndex: t.uniqueIndex('product_number_idx').on(table.productId),
    };
  },
);

export const productRelations = relations(products, ({ one }) => ({
  productLines: one(productLines, {
    fields: [products.productLine],
    references: [productLines.lineId],
  })
}));

