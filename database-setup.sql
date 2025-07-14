-- Database Setup Script for Skill Swap Platform
-- Run these commands in PostgreSQL to set up the database

-- 1. Create the database (run this as superuser)
CREATE DATABASE skill_swap_platform;

-- 2. Connect to the database
\c skill_swap_platform;

-- 3. Run the schema file (if you have it as a separate file)
-- \i database-schema.sql

-- 4. Verify the database was created successfully
SELECT current_database();

-- 5. List all tables to verify schema creation
\dt

-- 6. Check if extensions are enabled
SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';

-- 7. Verify sample data was inserted
SELECT COUNT(*) as total_categories FROM skill_categories;
SELECT COUNT(*) as total_skills FROM skills;
SELECT COUNT(*) as total_levels FROM skill_levels;

-- 8. Test a sample query
SELECT 
    s.name as skill_name,
    c.name as category,
    l.name as level
FROM skills s
JOIN skill_categories c ON s.category_id = c.id
JOIN skill_levels l ON s.level_id = l.id
LIMIT 5; 