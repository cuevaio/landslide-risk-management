import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: varchar("id", { length: 12 }).primaryKey(),

	clerkId: text("clerk_id").notNull(),

	fullName: text("full_name"),
	email: text("email"),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
