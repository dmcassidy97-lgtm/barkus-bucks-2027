const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const session = require('express-session');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-only-secret-change-me';

app.use(express.json());
app.set('trust proxy', 1);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 12, // 12 hours
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  return res.status(401).json({ error: 'Not authenticated' });
}

// ---------- Public: submit a fine ----------
app.post('/api/fines', (req, res) => {
  const { accused, reason, submitted_by, offense_date } = req.body || {};

  if (!accused || !reason || !submitted_by || !offense_date) {
    return res.status(400).json({ error: 'accused, reason, submitted_by, and offense_date are all required.' });
  }
  if (
    typeof accused !== 'string' || typeof reason !== 'string' ||
    typeof submitted_by !== 'string' || typeof offense_date !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid field types.' });
  }
  if (accused.length > 200 || reason.length > 1000 || submitted_by.length > 200 || offense_date.length > 50) {
    return res.status(400).json({ error: 'One or more fields is too long.' });
  }

  const fine = db.insertFine({
    accused: accused.trim(),
    reason: reason.trim(),
    submitted_by: submitted_by.trim(),
    offense_date: offense_date.trim(),
  });

  res.status(201).json({ ok: true, id: fine.id });
});

// ---------- Admin auth ----------
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (typeof password === 'string' && password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    return res.json({ ok: true });
  }
  return res.status(401).json({ error: 'Wrong password, mate.' });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/admin/session', (req, res) => {
  res.json({ isAdmin: !!(req.session && req.session.isAdmin) });
});

// ---------- Admin: fines log ----------
app.get('/api/admin/fines', requireAdmin, (req, res) => {
  res.json(db.getAllFines());
});

app.patch('/api/admin/fines/:id/resolve', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const { resolved } = req.body || {};
  db.updateResolved(id, !!resolved);
  res.json({ ok: true });
});

app.patch('/api/admin/fines/:id/punishment', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const { punishment } = req.body || {};
  db.updatePunishment(id, typeof punishment === 'string' ? punishment.slice(0, 300) : null);
  res.json({ ok: true });
});

app.delete('/api/admin/fines/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  db.deleteFine(id);
  res.json({ ok: true });
});

// ---------- Static site ----------
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Barkus' Big Fat Greek Bucks site running on http://localhost:${PORT}`);
});
