DROP TABLE IF EXISTS feedback, chat, message, doctor_credentials, users, user_mood, mood_share_timeframe, chat_profiles, login_requests, login_responses CASCADE;

-- LoginRequestDto
CREATE TABLE login_requests (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- LoginResponseDto
CREATE TABLE login_responses (
    token VARCHAR(255) NOT NULL
);

-- FeedbackEntity
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15),
    company_name VARCHAR(255),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT
);

-- ChatDto
CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT NOT NULL
);

-- MessageDto
CREATE TABLE message (
    chat_id INT NOT NULL,
    message_ord SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    FOREIGN KEY (chat_id) REFERENCES chat (id)
);

-- ChatProfileDto
CREATE TABLE chat_profiles (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    author VARCHAR(255) NOT NULL
);

-- DoctorCredentialsDto
CREATE TABLE doctor_credentials (
    id SERIAL PRIMARY KEY,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    clinic VARCHAR(255),
    specialisation VARCHAR(255)
);

-- UserDto
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- UserMoodDto
CREATE TABLE user_mood (
    id SERIAL PRIMARY KEY,
    color VARCHAR(50),
    emoji VARCHAR(50),
    description TEXT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- ShareMoodTimeFrameWithDoctorsDto
CREATE TABLE mood_share_timeframe (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    doctors_ids INT[],
    time_frame_start TIMESTAMP NOT NULL,
    time_frame_end TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);