import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';

const ReviewForm = () => {
    const [movieID, setMovieID] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const [rating, setRating] = useState('');
    const [reviewComments, setReviewComments] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/reviews', { movieID, reviewerName, rating, reviewComments });
            alert(`Review added with ID: ${response.data.reviewID}`);

            navigate(`/`);

        } catch (error) {
            alert(`Error: ${error.response.data.error}`);
        }
    };

    const handleChange = (event) => {
        const selectedMovie = movies.find(movie => movie.MovieID === event.target.value);
        setSelectedMovie(event.target.value);
        setMovieID(event.target.value);
        console.log(selectedMovie);
        console.log(event.target.value);
        console.log(movieID);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/movies');
                setMovies(response.data.movies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);


    return (
        <div style={{ height: '80vh', justifyContent: 'center', alignContent: 'center' }}>

            <div style={{
                justifyContent: 'center', border: '2px solid lightgrey',
                width: '50%', alignContent: 'center', alignItems: 'center',
                margin: 'auto', placeItems: 'center',
                height: '400px',
                display: 'flex', flexDirection: 'column', padding: '20px'
            }}>
                <form onSubmit={handleSubmit}>
                    <div style={{margin:'15px'}}><h2>Add Movie</h2></div>
                
                    <div>
                        <select style={{width:'300px',margin:'15px',padding:'5px',border:'2px solid lightgrey', color:'grey'}} id="movieDropdown" value={selectedMovie} onChange={handleChange}>
                            <option value="">--Select a Movie--</option>
                            {movies.map((movie) => (
                                <option key={movie.MovieID} value={movie.MovieID}>
                                    {movie.MovieName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={reviewerName}
                            placeholder="Your Name"
                            onChange={(e) => setReviewerName(e.target.value)}
                            required
                            style={{width:'300px',padding:'5px',
                                border:'2px solid lightgrey', color:'grey',
                                margin:'15px'
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={rating}
                            placeholder="Rating Out of 10"
                            onChange={(e) => setRating(e.target.value)}
                            required
                            style={{width:'300px',padding:'5px',
                                margin:'15px',border:'2px solid lightgrey', color:'grey'}}

                        />
                    </div>
                    <div>
                        <textarea
                            value={reviewComments}
                            onChange={(e) => setReviewComments(e.target.value)}
                            required
                            placeholder="Review Comment"

                            style={{width:'300px',padding:'5px',
                                margin:'15px',border:'2px solid lightgrey', color:'grey'}}

                        />
                    </div>
                    <button type="submit" style={{backgroundColor:'#BADEEC' , width:200 ,margin:'15px', height:40,color:'black'
                        , fontSize:'14px' 
                    }}>Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
