-- DJ Plan Progress Tracking Table
-- This table stores the completion status of missions for each user

CREATE TABLE IF NOT EXISTS dj_plan_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    mission_id TEXT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure a user can only complete each mission once
    UNIQUE(user_id, mission_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dj_plan_progress_user_id ON dj_plan_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_dj_plan_progress_mission_id ON dj_plan_progress(mission_id);
CREATE INDEX IF NOT EXISTS idx_dj_plan_progress_completed_at ON dj_plan_progress(completed_at);

-- Enable Row Level Security (RLS)
ALTER TABLE dj_plan_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view their own DJ plan progress" ON dj_plan_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own DJ plan progress" ON dj_plan_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own DJ plan progress" ON dj_plan_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own DJ plan progress" ON dj_plan_progress
    FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_dj_plan_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_dj_plan_progress_updated_at
    BEFORE UPDATE ON dj_plan_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_dj_plan_progress_updated_at();

-- Optional: Add a view to get mission completion statistics
CREATE OR REPLACE VIEW dj_plan_stats AS
SELECT 
    user_id,
    COUNT(*) as total_completed_missions,
    COUNT(*) FILTER (WHERE completed_at >= NOW() - INTERVAL '7 days') as missions_completed_this_week,
    COUNT(*) FILTER (WHERE completed_at >= NOW() - INTERVAL '30 days') as missions_completed_this_month,
    MIN(completed_at) as first_mission_completed,
    MAX(completed_at) as last_mission_completed
FROM dj_plan_progress
GROUP BY user_id;

-- Grant access to the view
GRANT SELECT ON dj_plan_stats TO authenticated;

-- Comment on the table
COMMENT ON TABLE dj_plan_progress IS 'Stores DJ plan mission completion progress for each user';
COMMENT ON COLUMN dj_plan_progress.user_id IS 'Reference to the user who completed the mission';
COMMENT ON COLUMN dj_plan_progress.mission_id IS 'Unique identifier for the mission (e.g., mission-1, mission-2)';
COMMENT ON COLUMN dj_plan_progress.completed_at IS 'Timestamp when the mission was completed'; 