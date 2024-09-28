import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './pages/navbar';
import AddMove from './pages/addmovie';
import Home from './pages/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Review from './pages/reviews';
import ReviewForm from './pages/addReview';




const App = () => {

    return (
      <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addMov" element={<AddMove />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/review/:id/:parentName/:parentRating" element={<Review />} />
          <Route path="/addReview" element={<ReviewForm />} />
        </Routes>
      </div>
    </Router>
    );
};

export default App;
