import { relations } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { employees } from "./employee";

export const logins = table(
  "logins",
  {
    eid: t.text().primaryKey(),
    password: t.text().notNull(),
    ...timestamps,
  },
  (table) => {
    return {
      eidIndex: t.uniqueIndex('login_idx').on(table.eid),
    };
  },
);

export const loginsRelations = relations(logins, ({ one }) => ({
  eid: one(employees, {
    fields: [logins.eid],
    references: [employees.eid],
  })
}));

