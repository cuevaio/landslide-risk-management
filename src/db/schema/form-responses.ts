import {
	decimal,
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { point } from "./point";
import { user } from "./user";

export const formResponses = pgTable("form_responses", {
	id: varchar("id", { length: 12 }).primaryKey(),

	pointId: varchar("point_id", { length: 12 }).references(() => point.id),

	// Demographic Questions
	gender: text("gender"), // P2. ¿Cuál es su género?
	age: integer("age"), // P.3. ¿Cuál es su edad?
	householdSize: integer("household_size"), // P4. ¿Cuántas personas viven en su hogar?
	elderlyCount: integer("elderly_count"), // P5. ¿Cuántas personas en el hogar son mayores de 65?
	childrenUnder10: integer("children_under_10"), // P6. ¿Cuántos personas en el hogar son NNA menores de 10?
	healthInsuranceCount: integer("health_insurance_count"), // P8. ¿Cuántas personas en el hogar tienen acceso a un seguro de salud?
	chronicConditionsCount: integer("chronic_conditions_count"), // P9. ¿Cuántas personas en el hogar tienen condición de salud crónica o degenerativa?
	higherEducationCount: integer("higher_education_count"), // P10. ¿Cuántas personas en el hogar han terminado estudios técnicos o universitarios?
	illiterateCount: integer("illiterate_count"), // P11. ¿Cuántas personas en el hogar no saben leer ni escribir?

	// Housing Characteristics
	wallMaterial: text("wall_material"), // P13. Seleccione el material principal de las paredes de su vivienda
	servicesCount: integer("services_count"), // P15. ¿Qué servicios públicos están disponibles en su comunidad?

	// Economic Information
	monthlyIncome: decimal("monthly_income", { precision: 10, scale: 2 }), // Ingreso mensual
	formalEmploymentCount: integer("formal_employment_count"), // P19. formal employment
	informalEmploymentCount: integer("informal_employment_count"), // P19. informal employment

	// Economic Losses
	housingLosses: decimal("housing_losses", { precision: 12, scale: 2 }), // P38. housing losses in soles

	// Metadata
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),

	createdBy: varchar("created_by", { length: 12 }).references(() => user.id),
	updatedBy: varchar("updated_by", { length: 12 }).references(() => user.id),
});
