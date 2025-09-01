# Database Population Scripts

This directory contains scripts for populating and managing the database.

## populate-db.ts

This script reads the `main.csv` file and populates the database with landslide risk management survey data.

### Usage

1. **Set up your database connection**:
   Create a `.env` file in the project root with your database URL:
   ```bash
   DATABASE_URL=your_database_connection_string
   ```
   
   For example:
   - PostgreSQL: `DATABASE_URL=postgresql://user:password@localhost:5432/database_name`
   - Neon: `DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/database_name?sslmode=require`

2. **Install dependencies**: `bun install`

3. **Run database migrations** (if not done already): `bun run drizzle-kit push`

4. **Run the population script**: `bun run populate-db`

### What it does

- Reads the CSV file from `src/db/schema/main.csv`
- Parses the tab-separated values
- Maps CSV columns to the database schema fields
- Inserts data into the `form_responses` table in batches
- Provides progress feedback during the process

### CSV Column Mapping

The script maps CSV columns to database fields as follows:

- **Geographic**: Latitud → latitude, Longitud → longitude
- **Demographics**: Gender, age, household composition
- **Housing**: Wall materials, services
- **Economic**: Income, employment, losses from landslides
- **Environmental**: Erosion and sediment measurements

### Error Handling

- Inserts data in batches of 10 records to avoid overwhelming the database
- Continues processing even if individual batches fail
- Provides detailed progress and error reporting
