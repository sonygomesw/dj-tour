-- Create mission tables and functions for DJ Tour gamification system

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS user_missions CASCADE;
DROP TABLE IF EXISTS user_stats CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS calculate_level(INTEGER) CASCADE;
DROP FUNCTION IF EXISTS update_user_stats() CASCADE;

-- Create the user_missions table
CREATE TABLE user_missions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    mission_id VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    user_notes TEXT,
    unlock_missions TEXT[], -- Array of mission IDs that this mission unlocks
    steps JSONB, -- Store mission steps with completion status
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for user_missions
CREATE INDEX idx_user_missions_user_id ON user_missions(user_id);
CREATE INDEX idx_user_missions_mission_id ON user_missions(mission_id);
CREATE INDEX idx_user_missions_status ON user_missions(status);
CREATE UNIQUE INDEX idx_user_missions_unique ON user_missions(user_id, mission_id);

-- Create the user_stats table
CREATE TABLE user_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    total_xp INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    missions_completed INTEGER DEFAULT 0,
    missions_in_progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for user_stats
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_missions
CREATE POLICY "Users can view own missions" ON user_missions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own missions" ON user_missions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own missions" ON user_missions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own missions" ON user_missions
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for user_stats
CREATE POLICY "Users can view own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_missions_updated_at 
    BEFORE UPDATE ON user_missions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at 
    BEFORE UPDATE ON user_stats 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate level based on XP
CREATE OR REPLACE FUNCTION calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- Each level requires 1000 XP more than the previous
    -- Level 1: 0-999 XP, Level 2: 1000-2999 XP, etc.
    RETURN FLOOR(xp / 1000) + 1;
END;
$$ language 'plpgsql';

-- Create function to update user stats automatically
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
DECLARE
    user_xp INTEGER;
    user_level INTEGER;
    completed_count INTEGER;
    in_progress_count INTEGER;
    mission_points INTEGER;
BEGIN
    -- Get mission points based on difficulty (this is a simplified version)
    -- In a real implementation, you'd join with a missions table
    mission_points := CASE 
        WHEN NEW.status = 'completed' THEN
            CASE 
                WHEN NEW.mission_id LIKE '%beginner%' THEN 100
                WHEN NEW.mission_id LIKE '%intermediate%' THEN 200
                ELSE 300
            END
        ELSE 0
    END;
    
    -- Calculate total XP for the user
    SELECT COALESCE(SUM(
        CASE 
            WHEN status = 'completed' THEN 
                CASE 
                    WHEN mission_id LIKE '%beginner%' THEN 100
                    WHEN mission_id LIKE '%intermediate%' THEN 200
                    ELSE 300
                END
            ELSE 0
        END
    ), 0) INTO user_xp
    FROM user_missions 
    WHERE user_id = NEW.user_id;
    
    -- Calculate level
    user_level := calculate_level(user_xp);
    
    -- Count completed missions
    SELECT COUNT(*) INTO completed_count
    FROM user_missions 
    WHERE user_id = NEW.user_id AND status = 'completed';
    
    -- Count in-progress missions
    SELECT COUNT(*) INTO in_progress_count
    FROM user_missions 
    WHERE user_id = NEW.user_id AND status = 'in_progress';
    
    -- Insert or update user stats
    INSERT INTO user_stats (user_id, total_xp, current_level, missions_completed, missions_in_progress)
    VALUES (NEW.user_id, user_xp, user_level, completed_count, in_progress_count)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        total_xp = user_xp,
        current_level = user_level,
        missions_completed = completed_count,
        missions_in_progress = in_progress_count,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update user stats automatically
CREATE TRIGGER update_user_stats_trigger 
    AFTER INSERT OR UPDATE ON user_missions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_user_stats();

-- Insert some sample data for testing (optional)
-- You can uncomment this section if you want to test with sample data

/*
-- Sample user missions (replace with actual user IDs)
INSERT INTO user_missions (user_id, mission_id, status, progress, started_at) VALUES
('00000000-0000-0000-0000-000000000001', 'social-setup', 'in_progress', 75, NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000001', 'spotify-setup', 'completed', 100, NOW() - INTERVAL '5 days'),
('00000000-0000-0000-0000-000000000001', 'competitor-analysis', 'not_started', 0, NULL);
*/

-- Success message
SELECT 'Mission tables and functions created successfully!' as message; 