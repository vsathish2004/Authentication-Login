import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup.jsx'; // Adjust the import path if necessary
import Login from './Login.jsx';   // Adjust the import path if necessary
import Home from './Home.jsx';     // Make sure to import the Home component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />  {/* Redirect to Signup on root */}
        <Route path="/register" element={<Signup />} /> {/* Signup page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/home" element={<Home />} />  {/* Home page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
