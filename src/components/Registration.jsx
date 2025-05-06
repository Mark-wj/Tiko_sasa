import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });
  const [message, setMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTermsChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const validateForm = () => {
    if (formData.password !== formData.password2) {
      setMessage('Passwords do not match');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage('Invalid email format');
      return false;
    }
    if (formData.password.length < 8) {
      setMessage('Password must be at least 8 characters');
      return false;
    }
    if (!acceptedTerms) {
      setMessage('You must accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch('https://tiko-sasa-backend.onrender.com/api/accounts/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          password_confirmation: formData.password2
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage(data.detail || JSON.stringify(data));
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full animate-pop-in shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-100 rounded-full p-4 mb-4">
            <svg 
              className="w-12 h-12 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. You will be redirected to login shortly.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  );

  return ( 
    <div className="font-[sans-serif] bg-white md:h-screen relative">
      {showSuccessModal && <SuccessModal />}
      
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img 
            src="https://readymadeui.com/signin-image.webp" 
            className="lg:max-w-[85%] w-full h-full aspect-square object-contain block mx-auto" 
            alt="registration visual" 
          />
        </div>

        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-yellow-400">Create Account</h3>
              <p className="text-gray-300 text-sm mt-2">Join our community today</p>
            </div>

            {/* Form Fields - Same as previous version but with updated spacing */}
            <div className="space-y-6">
              <div>
                <label className="text-white text-xs block mb-2">Username</label>
                <input 
                  name="username" 
                  type="text" 
                  required 
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none" 
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input name="email" type="text" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none" placeholder="Enter email" 
                value={formData.email}
                onChange={handleChange}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <label className="text-white text-xs block mb-2">First Name</label>
              <div className="relative flex items-center">
                <input name="first_name" type="text" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none" placeholder="First Name"
                id="first_name"
                 value={formData.first_name}
                 onChange={handleChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div>
              <label className="text-white text-xs block mb-2">Last Name</label>
              <div className="relative flex items-center">
                <input name="last name" type="text" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none" placeholder="Last Name"
                 value={formData.last_name_name}
                 onChange={handleChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input name="password" type="password" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none" placeholder="*********" 
                value={formData.password}
                onChange={handleChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Confirm Password</label>
              <div className="relative flex items-center">
                <input name="password2" type="password" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none" placeholder="********"
                value={formData.password2} 
                onChange={handleChange}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
              </div>


            {message && (
              <p className="text-center text-red-400 text-sm my-4 animate-fade-in">
                {message}
              </p>
            )}

            <div className="flex items-center mt-8">
              <input 
                id="terms" 
                name="terms" 
                type="checkbox" 
                className="h-4 w-4 shrink-0 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                checked={acceptedTerms}
                onChange={handleTermsChange} 
              />
              <label htmlFor="terms" className="text-white ml-3 block text-sm">
                I agree to the <a href="#terms" className="text-yellow-400 font-semibold hover:underline">Terms of Service</a>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full mt-8 shadow-xl py-3.5 px-6 text-sm font-semibold rounded bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-sm text-gray-300 mt-6 text-center">
              Already have an account? {' '}
              <a href="/login" className="text-yellow-400 font-semibold hover:underline">Sign in here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;