-- MoonBoard Beta Videos – PostgreSQL schema (replaces Supabase)
-- Run this against your Postgres DB before starting the app (e.g. psql $DATABASE_URL -f schema.sql)

-- Users (referenced by id in Videos.uploaded_by)
CREATE TABLE IF NOT EXISTS "Users" (
  id SERIAL PRIMARY KEY,
  username TEXT,
  "firstName" TEXT,
  "lastName" TEXT
);

-- Problems (2019 set) – name used for join with Videos
CREATE TABLE IF NOT EXISTS "Problems_2019" (
  id SERIAL PRIMARY KEY,
  name TEXT,
  grade TEXT
);

-- Problems (legacy?) – holds updates by id
CREATE TABLE IF NOT EXISTS "Problems" (
  id SERIAL PRIMARY KEY,
  holds JSONB
);

-- Videos – problemName and uploaded_by reference problem name and user id
CREATE TABLE IF NOT EXISTS "Videos" (
  id SERIAL PRIMARY KEY,
  "problemName" TEXT NOT NULL,
  uploaded_by INTEGER REFERENCES "Users"(id),
  link TEXT,
  video TEXT,
  img TEXT
);

CREATE INDEX IF NOT EXISTS idx_videos_problem_name ON "Videos" ("problemName");
CREATE INDEX IF NOT EXISTS idx_videos_uploaded_by ON "Videos" (uploaded_by);
CREATE INDEX IF NOT EXISTS idx_problems_2019_name ON "Problems_2019" (name);
