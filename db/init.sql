-- Create a schema named 'public'
CREATE SCHEMA IF NOT EXISTS public;

-- Grant usage and create privileges on the 'public' schema to the user passed through docker-compose
GRANT USAGE ON SCHEMA public TO postgres;
GRANT CREATE ON SCHEMA public TO postgres;

