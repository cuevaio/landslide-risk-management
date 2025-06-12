import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const file = pgTable("file", {
	id: varchar("id", { length: 12 }).primaryKey(),

	userId: text("user_id").notNull(),

	name: text("name").notNull(),
	url: text("url").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
