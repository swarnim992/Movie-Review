import React from 'react';
import '././styles/reviewstyle.css'
import './styles/Tile.css'



const rTile = ({ movieName, releaseDate, rating }) => {
    return (
        <div className="r-container">
            <h2 className="r-title">{movieName}</h2>
            <p className="r-des">Released: {releaseDate}</p>
            <p className="r-rating">Rating: {rating}/10</p>
            <div className="tile-actions">
                <button className="edit-btn">✏️</button>
                <button className="delete-btn">🗑️</button>
            </div>
        </div>
    );
}

export default rTile;
