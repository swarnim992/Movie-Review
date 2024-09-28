import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tile from './movietile';
import { useNavigate } from 'react-router-dom';


const AddMove = ()=>{
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [movieName, setMovieName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [review, setReview] = useState({
        reviewerName: '',
        rating: '',
        reviewComments: ''
    });

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    // Function to handle search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // // Filtered movies based on search term
    // const filteredMovies = movies.filter(movie =>
    //     movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

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

    const addMovie = () => {
        // axios.post('/movies', { movieName, releaseDate })
        //     .then(response => {
        //         setMovies([...movies, { MovieID: response.data.movieID, MovieName: movieName, ReleaseDate: releaseDate, AverageRating: null }]);
        //         setMovieName('');
        //         setReleaseDate('');
        //     })
        //     .catch(error => console.error('Error adding movie:', error));

        axios.post('http://localhost:5000/movies', { movieName, releaseDate })
        .then(response => {
            console.log("Movie added successfully:", response.data);
            setMovies([...movies, { MovieID: response.data.movieID, MovieName: movieName, ReleaseDate: releaseDate, AverageRating: null }]);
            setMovieName('');
            setReleaseDate('');
            navigate(`/`);
        })
        .catch(error => {
            console.error('Error adding movie:', error);
        });
    };

    const addReview = () => {
      axios.post('http://localhost:5000/reviews', { 
          ...review, 
          movieID: selectedMovie.MovieID, 
          rating: parseInt(review.rating, 10) // Parse rating as an integer
      })
      .then(response => {
          setReviews([...reviews, { ...review, ReviewID: response.data.reviewID }]);
          setReview({ reviewerName: '', rating: '', reviewComments: '' });
      })
      .catch(error => console.error('Error adding review:', error));
  };

    const fetchReviews = (movieID) => {
        axios.get(`http://localhost:5000/movies/${movieID}/reviews`)
            .then(response => setReviews(response.data.reviews))
            .catch(error => console.error('Error fetching reviews:', error));
    };

    return (
            <div style={{height:'80vh',justifyContent:'center',alignContent:'center'}}>
                <div style={{justifyContent:'center',border:'2px solid lightgrey', 
                    width:'50%',alignContent:'center',alignItems:'center',
                    margin:'auto',placeItems:'center',
                    height:'300px',
                    display:'flex',flexDirection:'column',padding:'20px'}}>
                    
                    <h2>Add Movie</h2>
                    

                    <div style={{margin:'15px'}}>
                    <input
                        type="text"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        placeholder="Movie Name"
                        style={{width:'300px',padding:'5px',border:'2px solid lightgrey', color:'grey'}}
                    />
                        </div>
                    
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        placeholder="Release Date"
                        
                        style={{width:'300px',padding:'5px',border:'2px solid lightgrey', color:'grey' , marginBottom:'20px'}}
                    />
                    <button style={{backgroundColor:'#BADEEC' , width:200 , height:40,color:'black'
                        , fontSize:'14px' 
                    }}
                    onClick={addMovie}>Add Movie</button>
                </div>
                
            </div>
    );
}

export default AddMove;