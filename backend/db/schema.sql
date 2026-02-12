-- Airbnb Clone Database Schema

-- Drop tables if they exist (for fresh setup)
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;

-- Create experiences table
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  thumbnail VARCHAR(500) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  experience_id INTEGER NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for London (15 experiences)
INSERT INTO experiences (title, city, thumbnail, price, category) VALUES
('Tower of London Historic Tour', 'london', '/images/thumbnails/london-1.jpg', 35, 'History'),
('Thames River Evening Cruise', 'london', '/images/thumbnails/london-2.jpg', 45, 'Tours'),
('British Museum Guided Walk', 'london', '/images/thumbnails/london-3.jpg', 25, 'Culture'),
('Westminster Abbey Experience', 'london', '/images/thumbnails/london-4.jpg', 40, 'History'),
('London Eye Sunset Ride', 'london', '/images/thumbnails/london-5.jpg', 50, 'Tours'),
('Buckingham Palace Tour', 'london', '/images/thumbnails/london-6.jpg', 55, 'History'),
('Big Ben & Parliament Walk', 'london', '/images/thumbnails/london-7.jpg', 30, 'Tours'),
('Tower Bridge Photography Tour', 'london', '/images/thumbnails/london-8.jpg', 35, 'Photography'),
('Hyde Park Picnic Experience', 'london', '/images/thumbnails/london-9.jpg', 20, 'Outdoors'),
('Covent Garden Food Tour', 'london', '/images/thumbnails/london-10.jpg', 60, 'Food'),
('Camden Market Shopping Walk', 'london', '/images/thumbnails/london-11.jpg', 15, 'Shopping'),
('Shakespeare Globe Theatre', 'london', '/images/thumbnails/london-12.jpg', 45, 'Culture'),
('St Paul Cathedral Tour', 'london', '/images/thumbnails/london-13.jpg', 38, 'History'),
('Notting Hill Walking Tour', 'london', '/images/thumbnails/london-14.jpg', 28, 'Tours'),
('Borough Market Food Tasting', 'london', '/images/thumbnails/london-15.jpg', 55, 'Food');

-- Insert sample data for Paris (15 experiences)
INSERT INTO experiences (title, city, thumbnail, price, category) VALUES
('Eiffel Tower Sunset Experience', 'paris', '/images/thumbnails/paris-1.jpg', 50, 'Landmarks'),
('Louvre Museum Private Tour', 'paris', '/images/thumbnails/paris-2.jpg', 65, 'Culture'),
('Notre-Dame Cathedral Walk', 'paris', '/images/thumbnails/paris-3.jpg', 35, 'History'),
('Arc de Triomphe Visit', 'paris', '/images/thumbnails/paris-4.jpg', 40, 'Landmarks'),
('Sacré-Cœur Montmartre Tour', 'paris', '/images/thumbnails/paris-5.jpg', 38, 'Culture'),
('Champs-Élysées Shopping Walk', 'paris', '/images/thumbnails/paris-6.jpg', 25, 'Shopping'),
('Versailles Palace Day Trip', 'paris', '/images/thumbnails/paris-7.jpg', 75, 'History'),
('Montmartre Art & Wine Tour', 'paris', '/images/thumbnails/paris-8.jpg', 60, 'Art'),
('Seine River Dinner Cruise', 'paris', '/images/thumbnails/paris-9.jpg', 85, 'Food'),
('Musée d''Orsay Art Tour', 'paris', '/images/thumbnails/paris-10.jpg', 45, 'Art'),
('Latin Quarter Food Walk', 'paris', '/images/thumbnails/paris-11.jpg', 55, 'Food'),
('Moulin Rouge Evening Show', 'paris', '/images/thumbnails/paris-12.jpg', 90, 'Entertainment'),
('Luxembourg Gardens Picnic', 'paris', '/images/thumbnails/paris-13.jpg', 30, 'Outdoors'),
('Sainte-Chapelle Stained Glass', 'paris', '/images/thumbnails/paris-14.jpg', 42, 'History'),
('Tuileries Garden Art Walk', 'paris', '/images/thumbnails/paris-15.jpg', 28, 'Art');

-- Insert sample data for Tokyo (15 experiences)
INSERT INTO experiences (title, city, thumbnail, price, category) VALUES
('Senso-ji Temple & Asakusa Walk', 'tokyo', '/images/thumbnails/tokyo-1.jpg', 30, 'Culture'),
('Tokyo Tower Night View', 'tokyo', '/images/thumbnails/tokyo-2.jpg', 40, 'Landmarks'),
('Shibuya Crossing Experience', 'tokyo', '/images/thumbnails/tokyo-3.jpg', 25, 'Tours'),
('Meiji Shrine Forest Walk', 'tokyo', '/images/thumbnails/tokyo-4.jpg', 35, 'Culture'),
('Tokyo Skytree Observation', 'tokyo', '/images/thumbnails/tokyo-5.jpg', 45, 'Landmarks'),
('Tsukiji Fish Market Tour', 'tokyo', '/images/thumbnails/tokyo-6.jpg', 50, 'Food'),
('Imperial Palace Gardens', 'tokyo', '/images/thumbnails/tokyo-7.jpg', 28, 'History'),
('Shinjuku Gyoen Garden Walk', 'tokyo', '/images/thumbnails/tokyo-8.jpg', 32, 'Outdoors'),
('Harajuku Fashion District', 'tokyo', '/images/thumbnails/tokyo-9.jpg', 20, 'Shopping'),
('Akihabara Anime Tour', 'tokyo', '/images/thumbnails/tokyo-10.jpg', 38, 'Culture'),
('Ueno Park Cherry Blossoms', 'tokyo', '/images/thumbnails/tokyo-11.jpg', 30, 'Outdoors'),
('Odaiba Bay Area Tour', 'tokyo', '/images/thumbnails/tokyo-12.jpg', 42, 'Tours'),
('Roppongi Art Triangle', 'tokyo', '/images/thumbnails/tokyo-13.jpg', 48, 'Art'),
('Traditional Tea Ceremony', 'tokyo', '/images/thumbnails/tokyo-14.jpg', 55, 'Culture'),
('Tokyo Disneyland Experience', 'tokyo', '/images/thumbnails/tokyo-15.jpg', 95, 'Entertainment');

-- Create indexes for better performance
CREATE INDEX idx_experiences_city ON experiences(city);
CREATE INDEX idx_bookings_experience_id ON bookings(experience_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
