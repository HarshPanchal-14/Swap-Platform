-- Skill Swap Platform Database Schema
-- Designed for PostgreSQL with proper relationships and data types

-- Enable UUID extension for better ID management
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table - Core user information
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    bio TEXT,
    profile_photo_url VARCHAR(500),
    is_public BOOLEAN DEFAULT true,
    is_admin BOOLEAN DEFAULT false,
    is_banned BOOLEAN DEFAULT false,
    ban_reason TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    completed_swaps INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User availability settings
CREATE TABLE user_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    weekends BOOLEAN DEFAULT false,
    evenings BOOLEAN DEFAULT false,
    weekdays BOOLEAN DEFAULT false,
    custom_schedule TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills categories
CREATE TABLE skill_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7), -- Hex color code
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skill levels lookup table
CREATE TABLE skill_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills table - Skills that users can offer or want to learn
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES skill_categories(id) ON DELETE SET NULL,
    description TEXT,
    level_id UUID NOT NULL REFERENCES skill_levels(id) ON DELETE RESTRICT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User skills - Many-to-many relationship between users and skills
CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    skill_type VARCHAR(20) NOT NULL CHECK (skill_type IN ('offered', 'wanted')),
    proficiency_level_id UUID REFERENCES skill_levels(id) ON DELETE RESTRICT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_id, skill_type)
);

-- Swap requests table
CREATE TABLE swap_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    instructor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requested_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    offered_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
    message TEXT,
    location VARCHAR(255),
    proposed_time VARCHAR(100),
    scheduled_time TIMESTAMP WITH TIME ZONE,
    completed_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Ratings and feedback
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    swap_request_id UUID NOT NULL REFERENCES swap_requests(id) ON DELETE CASCADE,
    rater_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rated_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(swap_request_id, rater_id)
);

-- Platform messages/announcements
CREATE TABLE platform_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('announcement', 'feature', 'maintenance', 'alert')),
    is_sent BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User reports for moderation
CREATE TABLE user_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reported_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    report_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    admin_notes TEXT,
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skill moderation queue
CREATE TABLE skill_moderation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    submitted_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    flags TEXT[], -- Array of flag reasons
    admin_notes TEXT,
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User sessions for real-time features
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs for analytics
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_admin ON users(is_admin);
CREATE INDEX idx_users_is_banned ON users(is_banned);
CREATE INDEX idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX idx_user_skills_skill_id ON user_skills(skill_id);
CREATE INDEX idx_user_skills_proficiency_level_id ON user_skills(proficiency_level_id);
CREATE INDEX idx_skills_level_id ON skills(level_id);
CREATE INDEX idx_skills_category_id ON skills(category_id);
CREATE INDEX idx_swap_requests_requester_id ON swap_requests(requester_id);
CREATE INDEX idx_swap_requests_instructor_id ON swap_requests(instructor_id);
CREATE INDEX idx_swap_requests_status ON swap_requests(status);
CREATE INDEX idx_ratings_rated_user_id ON ratings(rated_user_id);
CREATE INDEX idx_user_reports_reported_user_id ON user_reports(reported_user_id);
CREATE INDEX idx_user_reports_status ON user_reports(status);
CREATE INDEX idx_skill_moderation_status ON skill_moderation(status);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_availability_updated_at BEFORE UPDATE ON user_availability
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_skills_updated_at BEFORE UPDATE ON user_skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_swap_requests_updated_at BEFORE UPDATE ON swap_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data insertion
INSERT INTO skill_categories (name, description, icon, color) VALUES
('Programming', 'Software development and coding skills', '💻', '#3B82F6'),
('Music', 'Musical instruments and theory', '🎵', '#10B981'),
('Language', 'Foreign language learning', '🗣️', '#F59E0B'),
('Arts', 'Creative and artistic skills', '🎨', '#8B5CF6'),
('Culinary', 'Cooking and food preparation', '👨‍🍳', '#EF4444'),
('Wellness', 'Health and fitness activities', '🧘‍♀️', '#06B6D4'),
('Design', 'Graphic and visual design', '🎨', '#84CC16'),
('Communication', 'Public speaking and communication', '🎤', '#F97316');

-- Insert skill levels
INSERT INTO skill_levels (name, description, sort_order) VALUES
('Beginner', 'Basic level suitable for newcomers', 1),
('Intermediate', 'Moderate level for those with some experience', 2),
('Advanced', 'Expert level for experienced practitioners', 3),
('All Levels', 'Suitable for all skill levels', 4);

-- Insert sample skills
INSERT INTO skills (name, category_id, description, level_id) VALUES
('Web Development', (SELECT id FROM skill_categories WHERE name = 'Programming'), 'Full-stack web development with modern frameworks', (SELECT id FROM skill_levels WHERE name = 'Intermediate')),
('Guitar Lessons', (SELECT id FROM skill_categories WHERE name = 'Music'), 'Acoustic and electric guitar instruction', (SELECT id FROM skill_levels WHERE name = 'Beginner')),
('Spanish Language', (SELECT id FROM skill_categories WHERE name = 'Language'), 'Conversational Spanish for beginners', (SELECT id FROM skill_levels WHERE name = 'Beginner')),
('Photography', (SELECT id FROM skill_categories WHERE name = 'Arts'), 'Digital photography and editing', (SELECT id FROM skill_levels WHERE name = 'Intermediate')),
('Cooking Basics', (SELECT id FROM skill_categories WHERE name = 'Culinary'), 'Essential cooking techniques and recipes', (SELECT id FROM skill_levels WHERE name = 'Beginner')),
('Yoga & Meditation', (SELECT id FROM skill_categories WHERE name = 'Wellness'), 'Mindfulness and yoga practices', (SELECT id FROM skill_levels WHERE name = 'All Levels')),
('Graphic Design', (SELECT id FROM skill_categories WHERE name = 'Design'), 'Adobe Creative Suite and design principles', (SELECT id FROM skill_levels WHERE name = 'Intermediate')),
('Public Speaking', (SELECT id FROM skill_categories WHERE name = 'Communication'), 'Overcome stage fright and deliver presentations', (SELECT id FROM skill_levels WHERE name = 'All Levels')); 