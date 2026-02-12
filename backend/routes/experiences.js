const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all experiences
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM experiences ORDER BY city, id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching experiences:', err);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// GET experiences by city
router.get('/city/:cityName', async (req, res) => {
  try {
    const { cityName } = req.params;
    const result = await db.query(
      'SELECT * FROM experiences WHERE city = $1 ORDER BY id',
      [cityName.toLowerCase()]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching experiences by city:', err);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// GET single experience by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM experiences WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching experience:', err);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

// POST - Create new experience (admin only - can add later)
router.post('/', async (req, res) => {
  try {
    const { title, city, thumbnail, price, category } = req.body;
    
    const result = await db.query(
      'INSERT INTO experiences (title, city, thumbnail, price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, city, thumbnail, price, category]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating experience:', err);
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

module.exports = router;
