import { relations } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { timestamps } from "./columns.helpers";
import { customers } from "./customer";
import { offices } from "./offices";

export const employees = table(
  "employees",
  {
    eid: t.text("employee_number").primaryKey(),
    reportsTo: t.text("report_to"),
    fname: t.text("customer_fname").notNull(),
    lname: t.text("customer_lname").notNull(),
    ext: t.text('extension').notNull(),
    email: t.text().notNull().unique(),
    officeCode: t.numeric().notNull(),
    ...timestamps,
  },
  (table) => {
    return {
      eidIndex: t.uniqueIndex("eid_idx").on(table.eid),
    };
  },
);

export const employeeRelations = relations(employees, ({ one, many }) => ({
  customers: many(customers),
  reportsTo: one(employees, {
    fields: [employees.reportsTo],
    references: [employees.eid],
  }),
  officeCode: one(offices, {
    fields: [employees.officeCode],
    references: [offices.officeCode],
  }),
}));

