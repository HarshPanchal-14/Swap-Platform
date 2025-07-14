// Simple Database Connection Test
// This script will prompt for credentials and test the connection

const { Client } = require('pg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function testConnection() {
  console.log('🔌 PostgreSQL Connection Test');
  console.log('=============================\n');
  
  // Get database credentials
  const user = await question('Enter PostgreSQL username (default: postgres): ') || 'postgres';
  const password = await question('Enter PostgreSQL password: ');
  
  if (!password) {
    console.log('❌ Password is required!');
    rl.close();
    return;
  }
  
  const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'skill_swap_platform',
    user: user,
    password: password,
    ssl: false,
    connectionTimeoutMillis: 5000
  };
  
  const client = new Client(dbConfig);
  
  try {
    console.log('\n🔌 Connecting to PostgreSQL...');
    await client.connect();
    console.log('✅ Successfully connected to database!');
    
    // Test basic queries
    console.log('\n📊 Testing database structure...');
    
    // Check database name
    const dbResult = await client.query('SELECT current_database() as db_name');
    console.log(`📁 Database: ${dbResult.rows[0].db_name}`);
    
    // Count tables
    const tableResult = await client.query(`
      SELECT COUNT(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(`📋 Tables: ${tableResult.rows[0].table_count}`);
    
    // Check if sample data exists
    try {
      const categoryResult = await client.query('SELECT COUNT(*) as count FROM skill_categories');
      console.log(`🏷️  Skill categories: ${categoryResult.rows[0].count}`);
      
      const skillResult = await client.query('SELECT COUNT(*) as count FROM skills');
      console.log(`🎯 Skills: ${skillResult.rows[0].count}`);
      
      const levelResult = await client.query('SELECT COUNT(*) as count FROM skill_levels');
      console.log(`📈 Skill levels: ${levelResult.rows[0].count}`);
      
      if (categoryResult.rows[0].count > 0) {
        console.log('\n🎉 Database is properly set up with sample data!');
      } else {
        console.log('\n⚠️  Database exists but no sample data found.');
        console.log('   Run the schema file to populate sample data.');
      }
    } catch (error) {
      console.log('\n⚠️  Tables not found. You may need to run the schema file.');
      console.log('   Use: psql -h localhost -p 5432 -U ' + user + ' -d skill_swap_platform -f database-schema.sql');
    }
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure PostgreSQL is running on localhost:5432');
      console.log('2. Check if PostgreSQL service is started');
    } else if (error.message.includes('authentication failed')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check your username and password');
      console.log('2. Verify the user has access to the database');
    } else if (error.message.includes('does not exist')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Create the database: CREATE DATABASE skill_swap_platform;');
      console.log('2. Run the schema file to set up tables');
    }
  } finally {
    await client.end();
    rl.close();
  }
}

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

// Run the test
testConnection(); 