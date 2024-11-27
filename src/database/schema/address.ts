import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from 'drizzle-orm/sqlite-core'
import { customers } from "./customer";
import { timestamps } from "./columns.helpers";

export const address = table(
  "addresses",
  {
    addressId: t.text('address_id').primaryKey(),
    owner: t.text().references(() => customers.cid),
    addressLine1: t.text('address_line1'),
    addressLine2: t.text('address_line2'),
    addressNo: t.text('address_number'),
    city: t.text(),
    state: t.text(),
    postalCode: t.int(),
    country: t.text(),
    ...timestamps,
  },
  (table) => {
    return {
      addressIdIndex: t.uniqueIndex("address_id_idx").on(table.addressId),
      addressOwnerIndex: t.index("addr_owner_idx").on(table.owner),
      cityIndex: t.index("city_idx").on(table.city)
    };
  },
);
