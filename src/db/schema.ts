import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';

export const snippets = pgTable('snippets', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  code: text('code').notNull(),
  category: text('category'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}); 