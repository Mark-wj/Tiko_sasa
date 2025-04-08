import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Events from './pages/Events';
import Hotels from './pages/Hotels';
import Movies from './pages/Movies';
import NavBar from "./components/NavBar.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import EventDetails from "./components/EventDetails.jsx";
import HotelDetails from "./components/HotelDetails.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import CheckoutPage from "./pages/checkoutPage.jsx";
import Footer from "./components/Footer.jsx";
import Contact from './pages/Contact.jsx';

// Authentication wrapper component
function RequireAuth({ children, isAuthenticated }) {
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return children;
}

// Public route wrapper
function PublicRoute({ children, isAuthenticated }) {
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/events" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("authToken"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("authToken")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PublicRoute>
          } />
          
          <Route path="/login" element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          } />
          
          <Route path="/register" element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Registration />
            </PublicRoute>
          } />

          {/* Private routes */}
          <Route path="/events" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Events />
            </RequireAuth>
          } />
          
          <Route path="/events/:id" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <EventDetails />
            </RequireAuth>
          } />
          
          <Route path="/hotels" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Hotels />
            </RequireAuth>
          } />
          
          <Route path="/hotels/:id" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <HotelDetails />
            </RequireAuth>
          } />
          
          <Route path="/movies" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Movies />
            </RequireAuth>
          } />
          
          <Route path="/movies/:id" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <MovieDetails />
            </RequireAuth>
          } />
          
          <Route path="/checkout" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </RequireAuth>
          } />
          
          <Route path="/contact" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Contact />
            </RequireAuth>
          } />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;