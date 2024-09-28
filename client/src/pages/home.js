// import React from 'react';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Tile from './movietile';
import './styles/Tile.css'
import { Routes, Route, useNavigate } from 'react-router-dom';


function Home() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch movies on component mount
        axios.get('http://localhost:5000/movies')
            .then(response => {
                if(response.data && response.data.movies) {
                    setMovies(response.data.movies);
                }
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    // Function to handle search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    // const handleReviw => (e){
    //     navigate('/review/'+e);
    // }

    const handleReviw = (id,pname,rating) => {
        navigate(`/review/${id}/${pname}/${rating}`);
    };
  return (
    <div className="app-container">
            {/* Search input field */}
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />

            {/* Grid of filtered movie tiles */}
            <div className="tiles-grid">
            {movies.map((movie) => (
                    <div onClick={() => handleReviw(movie.MovieID,movie.MovieName,movie.AverageRating)}>
                         <Tile
                         key={movie.id}
                         movieName={movie.MovieName}
                         releaseDate={movie.releaseDate}
                         rating={movie.AverageRating}
                         movieID={movie.MovieID}
                     />
                    </div>
                    // <Tile
                    //     key={movie.id}
                    //     movieName={movie.MovieName}
                    //     releaseDate={movie.releaseDate}
                    //     rating={movie.AverageRating}
                    // />
                ))}
            </div>
        </div>
  );
}

export default Home;
