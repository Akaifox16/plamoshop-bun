import { relations } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { products } from "./product";

export const productLines = table(
  "product_lines",
  {
    lineId: t.text('product_line_number').primaryKey(),
    productLineName: t.text('product_line_name').notNull().unique(),
    ...timestamps,
  },
  (table) => {
    return {
      productLineIndex: t.uniqueIndex('product_line_idx').on(table.lineId),
    };
  },
);

export const productLineRelations = relations(productLines, ({ many }) => ({
  products: many(products)
}));


