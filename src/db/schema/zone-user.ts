import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { zone } from "./zone";

export const zoneUser = pgTable("zone_user", {
	id: varchar("id", { length: 12 }).primaryKey(),

	zoneId: varchar("zone_id", { length: 12 }).references(() => zone.id),
	userId: varchar("user_id", { length: 12 })
		.notNull()
		.references(() => user.id),

	role: text("role").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),

	createdBy: varchar("created_by", { length: 12 }).references(() => user.id),
	updatedBy: varchar("updated_by", { length: 12 }).references(() => user.id),
});
