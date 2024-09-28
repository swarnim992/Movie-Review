import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/reviewstyle.css'

const Review = () => {
    const { id , parentName , parentRating} = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log(id);
                console.log(id);
                console.log(id);
                const response = await axios.get(`http://localhost:5000/movies/${id}/reviews`);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Failed to fetch reviews.');
            }
        };
        
        fetchReviews();
    }, [id]);

    return (
        <div>
            <div style={{display:'flex',flexDirection:'row',padding:'15px',margin:'20px',justifyContent:'space-between' , fontSize:'35px',fontWeight:'700'}}>
                <div>{parentName}</div>
                <div style={{color:'blue'}}>{parentRating}/10</div>
            </div>
            {error ? (
                <p>{error}</p>
            ) : reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} style={{display:'flex',flexDirection:'column',border: "2px solid grey",padding:'15px',margin:'20px' }}>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',}}>
                            <div>{review.ReviewComments}</div>
                            <div style={{color:'blue'}}>{review.Rating}/10</div>
                            
                            
                        </div>

                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px'}}>
                            <div style={{fontStyle:'italic'}}>{review.ReviewerName}</div>
                            <div style={{color:'blue'}}> ✏️ 🗑️ </div>
                            
                            
                        </div>
                       
                    </div>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
};

export default Review;
