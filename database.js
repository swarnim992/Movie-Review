const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
const path = require('path');


const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });
// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Movies (
        MovieID INTEGER PRIMARY KEY AUTOINCREMENT,
        MovieName TEXT NOT NULL,
        ReleaseDate TEXT NOT NULL,
        AverageRating REAL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Reviews (
        ReviewID INTEGER PRIMARY KEY AUTOINCREMENT,
        MovieID INTEGER,
        ReviewerName TEXT,
        Rating INTEGER CHECK (Rating >= 1 AND Rating <= 10),
        ReviewComments TEXT,
        FOREIGN KEY (MovieID) REFERENCES Movies(MovieID)
    )`);
});

module.exports = db;
