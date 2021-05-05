BEGIN;

DROP TABLE IF EXISTS users, sessions, photos CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE sessions (
   sid TEXT PRIMARY KEY,
   data JSON NOT NULL
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    photo BYTEA,
    title text,
    tag text,
    created_at timestamp
);

INSERT INTO users (email, password, name) VALUES
(
  'test@gmail.com',
  '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWG',
  'Test Testington'
);

INSERT INTO sessions (sid, data) VALUES
(
  'abc123',
  '{"test":"stuff"}'
);

INSERT INTO photos ( user_id, photo, title, tag, created_at) VALUES
  (1, pg_read_file('../public/cat.jpg'), 'Holiday in Greece last year', 'Greece', (SELECT CURRENT_TIMESTAMP)),
  (2, pg_read_file('../public/cat.jpg'), 'Visiting London', 'London', (SELECT CURRENT_TIMESTAMP));

COMMIT;