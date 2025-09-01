import { readFileSync } from "node:fs";
import { join } from "node:path";
import { nanoid } from "nanoid";

// Function to parse CSV data
function parseCSV(csvContent: string): Record<string, string | null>[] {
	const lines = csvContent.trim().split("\n");

	// Define the actual column headers based on the data structure
	const headers = [
		"Latitud",
		"Longitud",
		"Nombre Zona / Asociación",
		"Departamento",
		"P2. ¿Cuál es su género?",
		"P.3. ¿Cuál es su edad?",
		"P4. ¿Cuántas personas viven en su hogar?",
		"P5. ¿Cuántas personas en el hogar son mayores de 65?",
		"P6. ¿Cuántos personas en el hogar son NNA menores de 10?",
		"P8. ¿Cuántas personas en el hogar tienen acceso a un seguro de salud (Ej. SIS, Essalud)?",
		"P9. ¿Cuántas personas en el hogar tienen condición de salud crónica o degenerativa?",
		"P10. ¿Cuántas personas en el hogar han terminado estudios técnicos o universitarios?",
		"P11. ¿Cuántas personas en el hogar no saben leer ni escribir?",
		"P13. Seleccione el material principal de las paredes de su vivienda:",
		"services_dummy_1",
		"services_dummy_2",
		"Ingreso mensual",
		"P19. ¿Cuántas personas cuentan con empleo formal en su hogar? (Escribir 0 si ninguna)",
		"P19. ¿Cuántas personas cuentan con empleo informal en su hogar? (Escribir 0 si ninguna)",
		"P38. Si su hogar tuvo pérdidas económicas a raíz del deslizamiento, ¿aproximadamente cuánto perdió en relación a su propiedad y activos?  >> Vivienda >> Costo aproximado (S/.)",
		"suma_erosion",
		"media_erosion",
		"desviacion_erosion",
		"suma_sed",
		"media_sed",
		"desviacion_sed",
	];

	// Skip the first 5 rows (headers and dummy rows) and start from actual data
	return lines.slice(5).map((line) => {
		const values = line.split("\t");
		const record: Record<string, string | null> = {};

		headers.forEach((header, index) => {
			const value = values[index]?.trim();
			record[header] = value === "" || value === undefined ? null : value;
		});

		return record;
	});
}

// Function to transform CSV record to database schema
function transformRecord(csvRecord: Record<string, string | null>) {
	return {
		id: nanoid(12),

		// Geographic Information
		latitude: csvRecord.Latitud || null,
		longitude: csvRecord.Longitud || null,
		zoneName: csvRecord["Nombre Zona / Asociación"] || null,
		department: csvRecord.Departamento || null,

		// Demographic Questions
		gender: csvRecord["P2. ¿Cuál es su género?"] || null,
		age: csvRecord["P.3. ¿Cuál es su edad?"]
			? Number.parseInt(csvRecord["P.3. ¿Cuál es su edad?"])
			: null,
		householdSize: csvRecord["P4. ¿Cuántas personas viven en su hogar?"]
			? Number.parseInt(csvRecord["P4. ¿Cuántas personas viven en su hogar?"])
			: null,
		elderlyCount: csvRecord[
			"P5. ¿Cuántas personas en el hogar son mayores de 65?"
		]
			? Number.parseInt(
					csvRecord["P5. ¿Cuántas personas en el hogar son mayores de 65?"],
				)
			: null,
		childrenUnder10: csvRecord[
			"P6. ¿Cuántos personas en el hogar son NNA menores de 10?"
		]
			? Number.parseInt(
					csvRecord["P6. ¿Cuántos personas en el hogar son NNA menores de 10?"],
				)
			: null,
		healthInsuranceCount: csvRecord[
			"P8. ¿Cuántas personas en el hogar tienen acceso a un seguro de salud (Ej. SIS, Essalud)?"
		]
			? Number.parseInt(
					csvRecord[
						"P8. ¿Cuántas personas en el hogar tienen acceso a un seguro de salud (Ej. SIS, Essalud)?"
					],
				)
			: null,
		chronicConditionsCount: csvRecord[
			"P9. ¿Cuántas personas en el hogar tienen condición de salud crónica o degenerativa?"
		]
			? Number.parseInt(
					csvRecord[
						"P9. ¿Cuántas personas en el hogar tienen condición de salud crónica o degenerativa?"
					],
				)
			: null,
		higherEducationCount: csvRecord[
			"P10. ¿Cuántas personas en el hogar han terminado estudios técnicos o universitarios?"
		]
			? Number.parseInt(
					csvRecord[
						"P10. ¿Cuántas personas en el hogar han terminado estudios técnicos o universitarios?"
					],
				)
			: null,
		illiterateCount: csvRecord[
			"P11. ¿Cuántas personas en el hogar no saben leer ni escribir?"
		]
			? Number.parseInt(
					csvRecord[
						"P11. ¿Cuántas personas en el hogar no saben leer ni escribir?"
					],
				)
			: null,

		// Housing Characteristics
		wallMaterial:
			csvRecord[
				"P13. Seleccione el material principal de las paredes de su vivienda:"
			] || null,
		servicesDummy1: csvRecord.services_dummy_1 || null,
		servicesDummy2: csvRecord.services_dummy_2 || null,

		// Economic Information
		monthlyIncome: csvRecord["Ingreso mensual"] || null,
		formalEmploymentCount: csvRecord[
			"P19. ¿Cuántas personas cuentan con empleo formal en su hogar? (Escribir 0 si ninguna)"
		]
			? Number.parseInt(
					csvRecord[
						"P19. ¿Cuántas personas cuentan con empleo formal en su hogar? (Escribir 0 si ninguna)"
					],
				)
			: null,
		informalEmploymentCount: csvRecord[
			"P19. ¿Cuántas personas cuentan con empleo informal en su hogar? (Escribir 0 si ninguna)"
		]
			? Number.parseInt(
					csvRecord[
						"P19. ¿Cuántas personas cuentan con empleo informal en su hogar? (Escribir 0 si ninguna)"
					],
				)
			: null,

		// Economic Losses
		housingLosses:
			csvRecord[
				"P38. Si su hogar tuvo pérdidas económicas a raíz del deslizamiento, ¿aproximadamente cuánto perdió en relación a su propiedad y activos?  >> Vivienda >> Costo aproximado (S/.)"
			] || null,

		// Environmental Measurements
		erosionSum: csvRecord.suma_erosion || null,
		erosionMean: csvRecord.media_erosion || null,
		erosionStdDev: csvRecord.desviacion_erosion || null,
		sedimentSum: csvRecord.suma_sed || null,
		sedimentMean: csvRecord.media_sed || null,
		sedimentStdDev: csvRecord.desviacion_sed || null,
	};
}

async function populateDatabase() {
	try {
		// Check if DATABASE_URL is set
		if (!process.env.DATABASE_URL) {
			console.error("❌ DATABASE_URL environment variable is not set");
			console.error("");
			console.error("Please create a .env file in the project root with:");
			console.error("DATABASE_URL=your_database_connection_string");
			console.error("");
			console.error("For example:");
			console.error(
				"DATABASE_URL=postgresql://user:password@localhost:5432/database_name",
			);
			console.error("or");
			console.error("DATABASE_URL=your_neon_database_connection_string");
			process.exit(1);
		}

		console.log("🔄 Starting database population...");

		// Read the CSV file
		const csvPath = join(__dirname, "../src/db/schema/main.csv");
		const csvContent = readFileSync(csvPath, "utf-8");

		console.log("📄 CSV file loaded successfully");

		// Parse CSV data
		const csvRecords = parseCSV(csvContent);
		console.log(`📊 Found ${csvRecords.length} records to import`);

		// Transform and insert records
		const transformedRecords = csvRecords.map(transformRecord);

		console.log("🔄 Inserting records into database...");

		// Import database module dynamically
		const { db, formResponses } = await import("../src/db");

		// Insert records in batches to avoid overwhelming the database
		const batchSize = 10;
		let insertedCount = 0;

		for (let i = 0; i < transformedRecords.length; i += batchSize) {
			const batch = transformedRecords.slice(i, i + batchSize);

			try {
				await db.insert(formResponses).values(batch);
				insertedCount += batch.length;
				console.log(
					`✅ Inserted batch ${Math.ceil((i + 1) / batchSize)}/${Math.ceil(transformedRecords.length / batchSize)} (${insertedCount}/${transformedRecords.length} records)`,
				);
			} catch (error) {
				console.error(
					`❌ Error inserting batch ${Math.ceil((i + 1) / batchSize)}:`,
					error,
				);
				// Continue with next batch
			}
		}

		console.log(
			`🎉 Database population completed! Successfully inserted ${insertedCount} out of ${transformedRecords.length} records.`,
		);
	} catch (error) {
		console.error("❌ Error populating database:", error);
		process.exit(1);
	}
}

// Run the population script
if (require.main === module) {
	populateDatabase()
		.then(() => {
			console.log("✅ Population script completed successfully");
			process.exit(0);
		})
		.catch((error) => {
			console.error("❌ Population script failed:", error);
			process.exit(1);
		});
}

export { populateDatabase };
