require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;

// Database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from "public" folder
app.use(express.static('public'));

// Health check
app.get('/healthz', (req, res) => {
  res.json({ ok: true, version: '1.0' });
});

// Create link
app.post('/api/links', async (req, res) => {
  const { target, code } = req.body;

  if (!target) return res.status(400).json({ error: 'Target URL required' });

  const shortCode = code || Math.random().toString(36).substring(2, 8);

  try {
    const exists = await pool.query('SELECT * FROM links WHERE code=$1', [shortCode]);
    if (exists.rows.length) return res.status(409).json({ error: 'Code already exists' });

    await pool.query('INSERT INTO links (code, target) VALUES ($1, $2)', [shortCode, target]);
    res.json({ shortUrl: `${baseUrl}/${shortCode}`, code: shortCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// List all links
app.get('/api/links', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM links ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get stats for a single code
app.get('/api/links/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query('SELECT * FROM links WHERE code=$1', [code]);
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete link
app.delete('/api/links/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query('DELETE FROM links WHERE code=$1 RETURNING *', [code]);
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect
app.get('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query('SELECT * FROM links WHERE code=$1', [code]);
    if (!result.rows.length) return res.status(404).send('Not found');

    await pool.query(
      'UPDATE links SET clicks = clicks + 1, last_clicked = now() WHERE code=$1',
      [code]
    );

    res.redirect(result.rows[0].target);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at ${baseUrl}`);
});
