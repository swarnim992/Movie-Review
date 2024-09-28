import React from 'react';
// import './Tile.css'; // External CSS file for styling
import './styles/Tile.css'
import axios from 'axios';


const Tile = ({ movieName, releaseDate, rating ,movieID}) => {

    const deleteMovie = async (movieID) => {
        try {
            // Send a delete request to the server
            await axios.delete(`http://localhost:5000/movies/${movieID}`);
            // Fetch the updated movie list
            // fetchMovies();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div className="tile-container">
            <h2 className="tile-title">{movieName}</h2>
            <p className="tile-release">Released: {releaseDate}</p>
            <p className="tile-rating">Rating: {rating}/10</p>
            <div className="tile-actions">
                <button className="edit-btn">✏️</button>
                <button className="delete-btn" onClick={() => deleteMovie(movieID)}>🗑️</button>
            </div>
        </div>
    );
}

export default Tile;





