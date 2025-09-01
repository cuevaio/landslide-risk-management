import { decimal, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { zone } from "./zone";

export const point = pgTable("point", {
	id: varchar("id", { length: 12 }).primaryKey(),

	latitude: decimal("latitude", { precision: 10, scale: 8 }),
	longitude: decimal("longitude", { precision: 11, scale: 8 }),
	zoneId: varchar("zone_id", { length: 12 }).references(() => zone.id),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),

	createdBy: varchar("created_by", { length: 12 }).references(() => user.id),
	updatedBy: varchar("updated_by", { length: 12 }).references(() => user.id),
});
