import { decimal, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { point } from "./point";
import { user } from "./user";

export const environmentalInformation = pgTable("environmental_information", {
	id: varchar("id", { length: 12 }).primaryKey(),

	erosionSum: decimal("erosion_sum", { precision: 15, scale: 6 }), // suma_erosion
	erosionMean: decimal("erosion_mean", { precision: 15, scale: 6 }), // media_erosion
	erosionStdDev: decimal("erosion_std_dev", { precision: 15, scale: 6 }), // desviacion_erosion
	sedimentSum: decimal("sediment_sum", { precision: 15, scale: 6 }), // suma_sed
	sedimentMean: decimal("sediment_mean", { precision: 15, scale: 6 }), // media_sed
	sedimentStdDev: decimal("sediment_std_dev", { precision: 15, scale: 6 }), // desviacion_sed

	pointId: varchar("point_id", { length: 12 }).references(() => point.id),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),

	createdBy: varchar("created_by", { length: 12 }).references(() => user.id),
	updatedBy: varchar("updated_by", { length: 12 }).references(() => user.id),
});
