/** @type { import("drizzle-kit").Config } */
module.exports = {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-floral-firefly-a59fc6o6-pooler.us-east-2.aws.neon.tech',
    user: 'neondb_owner',
    password: 'npg_t3mQIy6sKuvV',
    database: 'neondb',
    ssl: true
  }
}; 