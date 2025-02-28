import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required but not set');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for some hosting providers
  }
});

export const db = drizzle(pool, { schema });

// @INFO: Helper function to get all snippets
export async function getSnippets() {
  try {
    const result = await db.select().from(schema.snippets);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// @INFO: Helper function to create a new snippet
export async function createSnippet(data: {
  title: string;
  description?: string;
  code: string;
  category?: string;
}) {
  try {
    const result = await db.insert(schema.snippets)
      .values(data)
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
}

// @INFO: Helper function to delete a snippet
export async function deleteSnippet(id: number) {
  try {
    const result = await db.delete(schema.snippets)
      .where(eq(schema.snippets.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database delete error:', error);
    throw error;
  }
} 