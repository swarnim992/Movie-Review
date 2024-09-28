import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

function Navbar() {
  const navbarStyle = {
    backgroundColor: '#BADEEC',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px'
  };

  const buttonStyle = {
    backgroundColor: '#177b9a',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px', // To create space between the buttons
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/addMov');
    };
    const handleButtonClick1 = () => {
        navigate('/addReview');
    };
    const handleButtonClick2 = () => {
      navigate('/');
  };
    

  return (

    <div style={navbarStyle}>
      <div style={titleStyle} onClick={handleButtonClick2}>
        MOVIECRETIC
      </div>
      <div>
        <button style={buttonStyle} onClick={handleButtonClick}>Add New Movie</button>
        <button style={buttonStyle} onClick={handleButtonClick1}>Add New Review</button>
      </div>
    </div>
    // <nav style={{color: '#BADEEC',backgroundClip:'#BADEEC'}}>
    //   <ul style={{ display: 'flex', justifyContent: 'space-around', listStyleType: 'none' }}>
    //     <li><Link to="/">Home</Link></li>
    //     <li><Link to="/addMov">Add Move</Link></li>
    //     {/* <li><Link to="/contact">Contact</Link></li> */}
    //   </ul>
    // </nav>
  );
}

export default Navbar;
