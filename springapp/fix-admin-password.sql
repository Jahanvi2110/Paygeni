UPDATE users SET password = '$2a$10$gM8Fqj1dBEdJckuHNWFrsuSgnim6/xU8Nq9xWLA9JnuRH7faWATeS' WHERE username = 'admin@company.com';
SELECT username, password FROM users WHERE username = 'admin@company.com';
