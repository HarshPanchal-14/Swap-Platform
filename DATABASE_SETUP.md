# Database Setup Guide

This guide will help you set up the PostgreSQL database for the Skill Swap Platform.

## Prerequisites

- PostgreSQL installed and running on localhost:5432
- psql command-line tool available
- Node.js and npm installed

## Step 1: Install Dependencies

```bash
# Install PostgreSQL client for Node.js
npm install pg

# Install all project dependencies
npm install
```

## Step 2: Database Setup

### Option A: Using psql Command Line

```bash
# Connect to PostgreSQL as superuser
psql -h localhost -p 5432 -U postgres

# Create the database
CREATE DATABASE skill_swap_platform;

# Connect to the new database
\c skill_swap_platform

# Run the schema file (make sure you're in the project directory)
\i database-schema.sql

# Verify the setup
\dt
```

### Option B: Using npm scripts

```bash
# Reset and recreate the database (WARNING: This will delete existing data)
npm run db:reset

# Or just apply the schema to existing database
npm run db:setup
```

## Step 3: Configure Database Connection

Edit `database-connection.js` and update the credentials:

```javascript
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'skill_swap_platform',
  user: 'your_username',        // Change this
  password: 'your_password',    // Change this
  ssl: false,
  // ... other settings
};
```

## Step 4: Test the Connection

```bash
# Test database connection
npm run db:test
```

Expected output:
```
🔌 Connecting to PostgreSQL database...
✅ Successfully connected to database!

📊 Testing basic queries...
📁 Connected to database: skill_swap_platform
📋 Total tables: 12
🏷️  Skill categories: 8
🎯 Skills: 8
📈 Skill levels: 4

🔍 Sample data query:
  1. Web Development (Programming - Intermediate)
  2. Guitar Lessons (Music - Beginner)
  3. Spanish Language (Language - Beginner)

🎉 Database connection test completed successfully!
```

## Step 5: Verify Database Structure

### Check Tables
```sql
-- List all tables
\dt

-- Expected tables:
-- users, user_availability, skill_categories, skill_levels, skills, 
-- user_skills, swap_requests, ratings, platform_messages, 
-- user_reports, skill_moderation, user_sessions, activity_logs
```

### Check Sample Data
```sql
-- View skill categories
SELECT * FROM skill_categories;

-- View skills
SELECT s.name, c.name as category, l.name as level 
FROM skills s 
JOIN skill_categories c ON s.category_id = c.id 
JOIN skill_levels l ON s.level_id = l.id;

-- View skill levels
SELECT * FROM skill_levels;
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:5432
   ```
   **Solution**: Make sure PostgreSQL is running
   ```bash
   # On Windows
   net start postgresql-x64-15
   
   # On macOS
   brew services start postgresql
   
   # On Linux
   sudo systemctl start postgresql
   ```

2. **Authentication Failed**
   ```
   Error: password authentication failed for user "postgres"
   ```
   **Solution**: Check your username and password in `database-connection.js`

3. **Database Does Not Exist**
   ```
   Error: database "skill_swap_platform" does not exist
   ```
   **Solution**: Create the database first
   ```sql
   CREATE DATABASE skill_swap_platform;
   ```

4. **Permission Denied**
   ```
   Error: permission denied for database "skill_swap_platform"
   ```
   **Solution**: Grant permissions to your user
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE skill_swap_platform TO your_username;
   ```

### Reset Database

If you need to start fresh:

```bash
# Drop and recreate the database
npm run db:reset
```

### Manual Reset

```sql
-- Connect as superuser
psql -h localhost -p 5432 -U postgres

-- Drop and recreate database
DROP DATABASE IF EXISTS skill_swap_platform;
CREATE DATABASE skill_swap_platform;

-- Connect to new database
\c skill_swap_platform

-- Apply schema
\i database-schema.sql
```

## Database Schema Overview

### Core Tables
- **users**: User profiles and authentication
- **skills**: Available skills with categories and levels
- **user_skills**: Many-to-many relationship between users and skills
- **swap_requests**: Skill exchange requests and status tracking
- **ratings**: User feedback and ratings system

### Admin Tables
- **user_reports**: User reporting system for moderation
- **skill_moderation**: Skill approval/rejection queue
- **activity_logs**: Comprehensive activity tracking

### Performance Features
- **Indexes** on frequently queried columns
- **Triggers** for automatic timestamp updates
- **UUID primary keys** for better scalability
- **JSONB** for flexible data storage

## Environment Variables

For production, set these environment variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skill_swap_platform
DB_USER=your_username
DB_PASSWORD=your_password
DB_SSL=false
```

## Next Steps

1. ✅ Database is set up and connected
2. ✅ Sample data is loaded
3. ✅ Connection is tested
4. 🚀 Start the React application: `npm start`
5. 🎯 Test the platform features

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify PostgreSQL is running: `pg_isready -h localhost -p 5432`
3. Test connection manually: `psql -h localhost -p 5432 -U your_username -d skill_swap_platform`
4. Check PostgreSQL logs for detailed error messages 