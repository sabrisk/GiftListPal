DROP DATABASE IF EXISTS gifts_db;

CREATE DATABASE gifts_db;

\c gifts_db

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Participants --
CREATE TABLE event_user (
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    is_shopper BOOLEAN NOT NULL DEFAULT FALSE,
    is_recipient BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id, event_id),
    CHECK (is_shopper OR is_recipient)
);

CREATE TABLE gifts (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_name TEXT NOT NULL,
    link TEXT NOT NULL,
    event_id INT REFERENCES events(id) ON DELETE SET NULL DEFAULT NULL,
    recipient_user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    added_by_user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reserved_by_user_id INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_event_user_event_id ON event_user(event_id);