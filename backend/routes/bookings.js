const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT b.*, e.title, e.city, e.thumbnail 
      FROM bookings b
      JOIN experiences e ON b.experience_id = e.id
      ORDER BY b.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// GET single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT b.*, e.title, e.city, e.thumbnail 
      FROM bookings b
      JOIN experiences e ON b.experience_id = e.id
      WHERE b.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// POST - Create new booking
router.post('/', async (req, res) => {
  try {
    const { experience_id, booking_date, booking_time, guests, total_price } = req.body;
    
    // Validate required fields
    if (!experience_id || !booking_date || !booking_time || !guests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const result = await db.query(
      `INSERT INTO bookings (experience_id, booking_date, booking_time, guests, total_price) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [experience_id, booking_date, booking_time, guests, total_price]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// POST - Create multiple bookings at once
router.post('/bulk', async (req, res) => {
  try {
    const { bookings } = req.body;
    
    if (!bookings || !Array.isArray(bookings)) {
      return res.status(400).json({ error: 'Invalid bookings data' });
    }
    
    const createdBookings = [];
    
    // Insert each booking
    for (const booking of bookings) {
      const { experience_id, booking_date, booking_time, guests, total_price } = booking;
      
      const result = await db.query(
        `INSERT INTO bookings (experience_id, booking_date, booking_time, guests, total_price) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [experience_id, booking_date, booking_time, guests, total_price]
      );
      
      createdBookings.push(result.rows[0]);
    }
    
    res.status(201).json(createdBookings);
  } catch (err) {
    console.error('Error creating bulk bookings:', err);
    res.status(500).json({ error: 'Failed to create bookings' });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
