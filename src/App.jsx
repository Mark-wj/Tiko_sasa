import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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

// PublicRoute prevents access when logged in.
const PublicRoute = ({ children, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      !isAuthenticated ? (
        children
      ) : (
        // If authenticated, redirect away from public routes (home, login, register)
        <Redirect to="/events" />
      )
    }
  />
);

// PrivateRoute ensures access only when logged in.
const PrivateRoute = ({ children, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthenticated ? (
        children
      ) : (
        // If not authenticated, redirect to home
        <Redirect to="/" />
      )
    }
  />
);

function App() {
  // Lift authentication state into App.
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("authToken"))
  );

  // Optionally, listen for changes to localStorage (if needed)
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
        <Switch>
          {/* Public routes: accessible only when NOT logged in */}
          <PublicRoute exact path="/" isAuthenticated={isAuthenticated}>
            <Home />
          </PublicRoute>
          <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
            {/* Pass setIsAuthenticated so that Login can update the auth state */}
            <Login setIsAuthenticated={setIsAuthenticated} />
          </PublicRoute>
          <PublicRoute path="/register" isAuthenticated={isAuthenticated}>
            <Registration />
          </PublicRoute>

          {/* Private routes: accessible only when logged in */}
          <PrivateRoute path="/events/:id" isAuthenticated={isAuthenticated}>
            <EventDetails />
          </PrivateRoute>
          <PrivateRoute path="/events" isAuthenticated={isAuthenticated}>
            <Events />
          </PrivateRoute>
          <PrivateRoute path="/hotels/:id" isAuthenticated={isAuthenticated}>
            <HotelDetails />
          </PrivateRoute>
          <PrivateRoute path="/hotels" isAuthenticated={isAuthenticated}>
            <Hotels />
          </PrivateRoute>
          <PrivateRoute path="/movies/:id" isAuthenticated={isAuthenticated}>
            <MovieDetails />
          </PrivateRoute>
          <PrivateRoute path="/movies" isAuthenticated={isAuthenticated}>
            <Movies />
          </PrivateRoute>
          <PrivateRoute path="/checkout" isAuthenticated={isAuthenticated}>
            <CheckoutPage />
          </PrivateRoute>
          <PrivateRoute path="/contact" isAuthenticated={isAuthenticated}>
            <Contact />
          </PrivateRoute>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
