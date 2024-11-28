INSERT INTO users (id, username, first_name, last_name, email, date_of_birth, gender)
VALUES 
    (3, 'patient1', 'Emma', 'Wilson', 'emma.wilson@example.com', '1992-03-15', 'Female'),
    (4, 'patient2', 'Liam', 'Johnson', 'liam.johnson@example.com', '1988-07-23', 'Male'),
    (5, 'patient3', 'Sophia', 'Davis', 'sophia.davis@example.com', '1995-11-10', 'Female'),
    (6, 'patient4', 'Noah', 'Martin', 'noah.martin@example.com', '1990-12-05', 'Male'),
    (7, 'patient5', 'Olivia', 'Brown', 'olivia.brown@example.com', '1987-06-02', 'Female');


INSERT INTO doctor_credentials (username, name, surname, email, clinic, specialisation)
VALUES 
    ('doc1', 'Dr. Emily', 'Brown', 'emily.brown@hospital.com', 'City Clinic', 'Pediatrics'),
    ('doc2', 'Dr. Michael', 'Green', 'michael.green@hospital.com', 'Town Clinic', 'Cardiology');


INSERT INTO feedback (name, email, phone, company_name, rating, comment)
VALUES 
    ('Emma Wilson', 'emma.wilson@example.com', '9876543210', 'HealthCare Inc.', 5, 'Excellent service!'),
    ('Liam Johnson', 'liam.johnson@example.com', '4567891230', 'Wellness Ltd.', 4, 'Very satisfied!'),
    ('Sophia Davis', NULL, '1230984567', NULL, 3, 'Average experience.'),
    ('Noah Martin', 'noah.martin@example.com', '7891234560', NULL, 2, 'Could be better.'),
    ('Olivia Brown', 'olivia.brown@example.com', NULL, 'CareCo.', 5, 'Highly recommend!');


INSERT INTO chat (id, user_id, doctor_id)
VALUES 
    (3, 3, 1), -- Emma and Dr. Emily
    (4, 4, 1), -- Liam and Dr. Emily
    (5, 5, 2), -- Sophia and Dr. Michael
    (6, 6, 2), -- Noah and Dr. Michael
    (7, 7, 1); -- Olivia and Dr. Emily


INSERT INTO message (chat_id, sender_id, content)
VALUES 
    (3, 3, 'Hello, Dr. Emily!'),
    (3, 1, 'Hi Emma, how can I assist you?'),
    (4, 4, 'Good morning, Doctor.'),
    (4, 1, 'Good morning, Liam!'),
    (5, 5, 'Doctor, I have chest pain.'),
    (5, 2, 'Sophia, I recommend scheduling a cardiology appointment.'),
    (6, 6, 'Dr. Michael, I need help with my medication.'),
    (6, 2, 'Sure, Noah. Let me guide you.'),
    (7, 7, 'Thanks for your advice, Doctor.'),
    (7, 1, 'You are welcome, Olivia.');


INSERT INTO user_mood (color, emoji, description, user_id)
VALUES 
    ('Green', '😊', 'Feeling great!', 3), -- Emma Wilson
    ('Yellow', '😐', 'Neutral mood.', 4), -- Liam Johnson
    ('Blue', '😢', 'Feeling down.', 5), -- Sophia Davis
    ('Red', '😡', 'Angry mood.', 6), -- Noah Martin
    ('Pink', '😍', 'Very happy!', 7); -- Olivia Brown


INSERT INTO mood_share_timeframe (user_id, doctors_ids, time_frame_start, time_frame_end)
VALUES 
    (3, ARRAY[1], '2024-01-01 08:00:00', '2024-01-01 20:00:00'), -- Emma sharing with Dr. Emily
    (4, ARRAY[1], '2024-01-02 09:00:00', '2024-01-02 21:00:00'), -- Liam sharing with Dr. Emily
    (5, ARRAY[2], '2024-01-03 10:00:00', '2024-01-03 18:00:00'), -- Sophia sharing with Dr. Michael
    (6, ARRAY[2], '2024-01-04 07:00:00', '2024-01-04 19:00:00'), -- Noah sharing with Dr. Michael
    (7, ARRAY[1], '2024-01-05 06:00:00', '2024-01-05 22:00:00'); -- Olivia sharing with Dr. Emily


INSERT INTO chat_profiles (url, author)
VALUES 
    ('http://profile3.com', 'Emma Wilson'),
    ('http://profile4.com', 'Liam Johnson'),
    ('http://profile5.com', 'Sophia Davis'),
    ('http://profile6.com', 'Noah Martin'),
    ('http://profile7.com', 'Olivia Brown'),
    ('http://profile-doc1.com', 'Dr. Emily Brown'),
    ('http://profile-doc2.com', 'Dr. Michael Green');
