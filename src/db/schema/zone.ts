import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";

export const zone = pgTable("zone", {
	id: varchar("id", { length: 12 }).primaryKey(),

	name: text("name"),
	department: text("department"),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),

	createdBy: varchar("created_by", { length: 12 }).references(() => user.id),
	updatedBy: varchar("updated_by", { length: 12 }).references(() => user.id),
});
