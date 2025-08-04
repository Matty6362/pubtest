-- Create the raffle_entries table
CREATE TABLE IF NOT EXISTS raffle_entries (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_raffle_entries_email ON raffle_entries(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_raffle_entries_created_at ON raffle_entries(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE raffle_entries ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts from authenticated and anonymous users
CREATE POLICY "Allow inserts for all users" ON raffle_entries
    FOR INSERT WITH CHECK (true);

-- Create a policy that allows reads for authenticated users only
CREATE POLICY "Allow reads for authenticated users" ON raffle_entries
    FOR SELECT USING (auth.role() = 'authenticated'); 