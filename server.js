const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');

const app = express();
const db = new sqlite3.Database('users.db');

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'dispatch-tracker-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Initialize DB
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS discrepancies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    olpn TEXT,
    brand TEXT,
    date TEXT,
    week TEXT,
    month TEXT,
    expectedUnits INTEGER,
    shortUnits INTEGER,
    extraUnits INTEGER,
    picker TEXT,
    auditor TEXT,
    adjusted TEXT,
    caseResolved TEXT,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);

  // Default users (change passwords in production!)
  const defaultUsers = [
    { username: 'admin', password: 'Admin123!', role: 'admin' },
    { username: 'user1', password: 'User123!', role: 'user' },
    { username: 'auditor', password: 'Audit123!', role: 'user' }
  ];

  defaultUsers.forEach(u => {
    db.get("SELECT * FROM users WHERE username = ?", [u.username], (err, row) => {
      if (!row) {
        bcrypt.hash(u.password, 10, (err, hash) => {
          db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", 
            [u.username, hash, u.role]);
        });
      }
    });
  });
});

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;
    res.json({ success: true, username: user.username, role: user.role });
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/user', (req, res) => {
  if (req.session.userId) {
    res.json({ username: req.session.username, role: req.session.role });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

// CRUD Endpoints
app.get('/api/discrepancies', requireAuth, (req, res) => {
  db.all("SELECT * FROM discrepancies WHERE userId = ? ORDER BY date DESC", [req.session.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/discrepancies', requireAuth, (req, res) => {
  const data = req.body;
  const fields = 'userId, olpn, brand, date, week, month, expectedUnits, shortUnits, extraUnits, picker, auditor, adjusted, caseResolved, notes';
  const values = '?,'.repeat(14).slice(0, -1);
  
  db.run(`INSERT INTO discrepancies (${fields}) VALUES (${values})`, 
    [req.session.userId, data.olpn, data.brand, data.date, data.week, data.month,
     data.expectedUnits, data.shortUnits || 0, data.extraUnits || 0,
     data.picker, data.auditor, data.adjusted, data.caseResolved, data.notes || ''],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put('/api/discrepancies/:id', requireAuth, (req, res) => {
  const data = req.body;
  db.run(`UPDATE discrepancies SET olpn=?, brand=?, date=?, expectedUnits=?, shortUnits=?, extraUnits=?, 
          picker=?, auditor=?, adjusted=?, caseResolved=?, notes=? WHERE id=? AND userId=?`,
    [data.olpn, data.brand, data.date, data.expectedUnits, data.shortUnits || 0, data.extraUnits || 0,
     data.picker, data.auditor, data.adjusted, data.caseResolved, data.notes || '', req.params.id, req.session.userId],
    function(err) {
      if (err || this.changes === 0) return res.status(404).json({ error: 'Not found or unauthorized' });
      res.json({ success: true });
    }
  );
});

app.delete('/api/discrepancies/:id', requireAuth, (req, res) => {
  db.run("DELETE FROM discrepancies WHERE id = ? AND userId = ?", [req.params.id, req.session.userId], function(err) {
    if (err || this.changes === 0) return res.status(404).json({ error: 'Not found or unauthorized' });
    res.json({ success: true });
  });
});

// Serve app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Dispatch Tracker running on port ${PORT}`);
});
