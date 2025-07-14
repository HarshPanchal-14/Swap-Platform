// Database Connection Configuration
// This file contains connection settings for PostgreSQL

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'skill_swap_platform',
  user: 'postgres', // Change this to your PostgreSQL username
  password: '', // Add your PostgreSQL password here
  ssl: false, // Set to true if using SSL
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

// Connection string format for different libraries
const connectionString = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

// Environment variables (for production)
const envConfig = {
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  database: process.env.DB_NAME || dbConfig.database,
  user: process.env.DB_USER || dbConfig.user,
  password: process.env.DB_PASSWORD || dbConfig.password,
  ssl: process.env.DB_SSL === 'true' || dbConfig.ssl,
};

module.exports = {
  dbConfig,
  connectionString,
  envConfig
}; 