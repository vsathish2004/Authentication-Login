import React from 'react';

const Home = () => {
  // Retrieve user info from local storage or props (customize as needed)
  const userEmail = localStorage.getItem('userEmail') || 'User'; // Default to 'User' if no email is found

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {userEmail}!</h1>
      <p>You have successfully logged in.</p>
      <p>Explore the application and enjoy your experience!</p>
    </div>
  );
};

export default Home;
