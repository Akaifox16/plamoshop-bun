import { table } from "./schema";
import { spreads } from "./utils";

export const dbScheme = {
  insert: spreads({
    ...table,
  }, 'insert'),
  select: spreads({
    ...table
  }, 'select'),
} as const
