const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
// Endpoint to add a new movie
// app.post('/movies', (req, res) => {
//     const { movieName, releaseDate } = req.body;
//     db.run(`INSERT INTO Movies (MovieName, ReleaseDate) VALUES (?, ?)`, [movieName, releaseDate], function(err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ movieID: this.lastID });
//     });
// });


app.get('/movies', (req, res) => {
    db.all(`SELECT * FROM Movies`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ movies: rows });
    });
});

app.post('/movies', (req, res) => {
    const { movieName, releaseDate } = req.body;
    db.run(`INSERT INTO Movies (MovieName, ReleaseDate) VALUES (?, ?)`, [movieName, releaseDate], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ movieID: this.lastID });
    });
});

// Endpoint to add a new review
app.post('/reviews', (req, res) => {
    const { movieID, reviewerName, rating, reviewComments } = req.body;
    db.run(`INSERT INTO Reviews (MovieID, ReviewerName, Rating, ReviewComments) VALUES (?, ?, ?, ?)`, 
        [movieID, reviewerName, rating, reviewComments], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Update the average rating for the movie
        db.get(`SELECT AVG(Rating) as AverageRating FROM Reviews WHERE MovieID = ?`, [movieID], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            db.run(`UPDATE Movies SET AverageRating = ? WHERE MovieID = ?`, [row.AverageRating, movieID], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ reviewID: this.lastID });
            });
        });
    });
});

// Endpoint to get all reviews for a movie
app.get('/movies/:id/reviews', (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM Reviews WHERE MovieID = ?`, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ reviews: rows });
    });
});


app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    
    // First, delete all reviews associated with the movie
    db.run(`DELETE FROM Reviews WHERE MovieID = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Then delete the movie
        db.run(`DELETE FROM Movies WHERE MovieID = ?`, [id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: `Movie and associated reviews deleted` });
        });
    });
});

// Endpoint to delete a review
app.delete('/reviews/:id', (req, res) => {
    const { id } = req.params;
    
    // First, find the movieID related to the review to update the rating later
    db.get(`SELECT MovieID FROM Reviews WHERE ReviewID = ?`, [id], (err, review) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const movieID = review.MovieID;

        // Delete the review
        db.run(`DELETE FROM Reviews WHERE ReviewID = ?`, [id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Update the average rating of the movie after the review has been deleted
            db.get(`SELECT AVG(Rating) as AverageRating FROM Reviews WHERE MovieID = ?`, [movieID], (err, row) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                db.run(`UPDATE Movies SET AverageRating = ? WHERE MovieID = ?`, [row.AverageRating || null, movieID], (err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json({ message: `Review deleted and movie's rating updated` });
                });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
