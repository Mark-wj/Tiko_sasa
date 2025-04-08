import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import Home from './pages/Home';
import Events from './pages/Events';
import Hotels from './pages/Hotels';
import Movies from './pages/Movies';
import Contact from './pages/Contact.jsx';
import CheckoutPage from "./pages/checkoutPage.jsx";

import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";

import EventDetails from "./components/EventDetails.jsx";
import HotelDetails from "./components/HotelDetails.jsx";
import MovieDetails from "./components/MovieDetails.jsx";


// Protects private routes; if not authed → send to /login
function RequireAuth({ children, isAuthenticated }) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Prevents logged‑in users from seeing /login or /register
function PublicRoute({ children, isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("authToken"))
  );

  // Keep auth state in sync if another tab logs you in/out
  useEffect(() => {
    const onStorage = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("authToken")));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <Router>
      <NavBar />

      <Routes>
        {/* Public-only pages */}
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Registration />
            </PublicRoute>
          }
        />

        {/* Home now requires auth */}
        <Route
          path="/"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Home />
            </RequireAuth>
          }
        />

        {/* All other private routes */}
        <Route
          path="/events"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Events />
            </RequireAuth>
          }
        />
        <Route
          path="/events/:id"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <EventDetails />
            </RequireAuth>
          }
        />

        <Route
          path="/hotels"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Hotels />
            </RequireAuth>
          }
        />
        <Route
          path="/hotels/:id"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <HotelDetails />
            </RequireAuth>
          }
        />

        <Route
          path="/movies"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Movies />
            </RequireAuth>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <MovieDetails />
            </RequireAuth>
          }
        />

        <Route
          path="/checkout"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </RequireAuth>
          }
        />

        <Route
          path="/contact"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Contact />
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
