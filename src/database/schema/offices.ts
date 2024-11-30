import { relations } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { employees } from "./employee";

export const offices = table(
  "offices",
  {
    officeCode: t.numeric().primaryKey(),
    ...timestamps,
  },
  (table) => {
    return {
      officeCodeIndex: t.uniqueIndex('offc_code_idx').on(table.officeCode),
    };
  },
);

export const officesRelations = relations(offices, ({ many }) => ({
  employees: many(employees)
}));
