// Test Database Connection Script
// Run this to verify your PostgreSQL connection is working

const { Client } = require('pg');
const { dbConfig } = require('./database-connection');

async function testDatabaseConnection() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔌 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Successfully connected to database!');
    
    // Test basic query
    console.log('\n📊 Testing basic queries...');
    
    // Check database name
    const dbResult = await client.query('SELECT current_database() as db_name');
    console.log(`📁 Connected to database: ${dbResult.rows[0].db_name}`);
    
    // Count tables
    const tableResult = await client.query(`
      SELECT COUNT(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(`📋 Total tables: ${tableResult.rows[0].table_count}`);
    
    // Check skill categories
    const categoryResult = await client.query('SELECT COUNT(*) as count FROM skill_categories');
    console.log(`🏷️  Skill categories: ${categoryResult.rows[0].count}`);
    
    // Check skills
    const skillResult = await client.query('SELECT COUNT(*) as count FROM skills');
    console.log(`🎯 Skills: ${skillResult.rows[0].count}`);
    
    // Check skill levels
    const levelResult = await client.query('SELECT COUNT(*) as count FROM skill_levels');
    console.log(`📈 Skill levels: ${levelResult.rows[0].count}`);
    
    // Test a sample query
    console.log('\n🔍 Sample data query:');
    const sampleResult = await client.query(`
      SELECT 
        s.name as skill_name,
        c.name as category,
        l.name as level
      FROM skills s
      JOIN skill_categories c ON s.category_id = c.id
      JOIN skill_levels l ON s.level_id = l.id
      LIMIT 3
    `);
    
    sampleResult.rows.forEach((row, index) => {
      console.log(`  ${index + 1}. ${row.skill_name} (${row.category} - ${row.level})`);
    });
    
    console.log('\n🎉 Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure PostgreSQL is running on localhost:5432');
    console.log('2. Verify your username and password in database-connection.js');
    console.log('3. Ensure the skill_swap_platform database exists');
    console.log('4. Check that the schema has been applied');
  } finally {
    await client.end();
  }
}

// Run the test
testDatabaseConnection(); 