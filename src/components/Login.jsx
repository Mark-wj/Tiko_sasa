import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend API endpoint
    const res = await fetch('tiko-sasa-backend-production.up.railway.app/api/accounts/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (res.ok) {
      const data = await res.json();
      // Save tokens in localStorage
      localStorage.setItem('authToken', data.access); // This key is used to determine authentication
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setMessage('Login successful!');
      // Update the auth state so the App can re-render and redirect away from public routes
      setIsAuthenticated(true);
      // Redirect to a protected route (e.g., /events)
      history.push('/events');
    } else {
      const err = await res.json();
      setMessage(JSON.stringify(err));
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen" id="/login">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img src="https://tinyurl.com/4wcjkyn8" alt="Placeholder Image" className="object-cover w-full h-full" />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          {/* <!-- Email Input --> */}
          <div className="mb-4 bg-sky-100">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          {/* <!-- Remember Me Checkbox --> */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" name="remember" className="text-red-500" />
            <label htmlFor="remember" className="text-green-900 ml-2">Remember Me</label>
          </div>
          {/* <!-- Forgot Password Link --> */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>
          {/* <!-- Login Button --> */}
          <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
            Login
          </button>
          {message && (
            <p className="text-center text-red-500 text-sm mb-4">
              {message}
            </p>
          )}
        </form>
        {/* <!-- Sign up Link --> */}
        <div className="mt-6 text-green-500 text-center">
          <a href="/register" className="hover:underline">Register Here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
