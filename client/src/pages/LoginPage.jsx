import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import RouletteGif from '../components/RouletteGif';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/assets/login_bg.webp")' }}>
      {/* Main content wrapper - relative for absolute positioning of mobile logo */}
      <div className="relative w-full h-full">
        {/* Mobile Logo in top left (Visible only on small screens) */}
        <div className="absolute top-4 left-4 z-20 md:hidden">
          <img src="/assets/logo.png" alt="Logo" className="h-16 w-auto" /> {/* Adjust size for mobile if needed */}
        </div>

        {/* Original content - position adjusted for mobile logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col md:flex-row items-center justify-center md:justify-between w-full max-w-sm md:max-w-4xl space-y-8 md:space-y-0 md:space-x-12 p-4 pt-20 md:p-0"> {/* Added mobile padding */}
          {/* Left Section: Login Form and 18+ Image */}
          <div className="flex flex-col items-center space-y-6 w-full md:w-auto">
            {/* "FOR AMUSEMENT ONLY" text */}
            <p className="text-white text-sm font-semibold tracking-wider mb-2">FOR AMUSEMENT ONLY</p>

            {/* Login Form */}
            <div className="p-8 rounded-lg shadow-2xl w-full max-w-sm border border-blue-600 bg-gray-900/70 text-center grid grid-cols-1 gap-6">
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">MEMBER LOGIN</h2>
                {error && (
                  <div className="bg-red-500/90 text-white p-3 rounded mb-4">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-yellow-400 mb-2 text-left">Username</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-black/50 text-white border border-blue-600 focus:border-blue-400 focus:outline-none transition-colors duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-400 mb-2 text-left">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-black/50 text-white border border-blue-600 focus:border-blue-400 focus:outline-none transition-colors duration-200"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 text-white font-bold py-3 px-4 rounded-full transition-colors duration-200 shadow-lg"
                    style={{
                      backgroundImage: 'url("/assets/loginscreen -btn.png")',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
                {/* Register Link */}
                <div className="text-center mt-4">
                  <span className="text-white text-sm">New User ? </span>
                  <Link to="/register" className="text-red-500 hover:underline text-sm">Sign up here</Link>
                </div>
              </div>
            </div>

            {/* 18+ Restriction Image */}
            <img src="/assets/loginscreen18+.png" alt="18+ Restriction" className="h-auto max-w-xs" />
          </div>

          {/* Right Section: Logo and Rules (Logo hidden on small screens) */}
          <div className="hidden md:flex flex-col items-center space-y-6 md:mt-0 w-full md:w-auto">
            {/* Logo with Glow Board (Hidden on small screens) */}
            <div className="relative flex items-center justify-center hidden md:flex">
              <img
                src="/assets/Glow_board.png"
                alt="Glow Board"
                className="absolute w-[160%] h-auto"
                style={{
                  transform: 'translate(-50%, -50%)',
                  left: '50%',
                  top: '50%',
                  zIndex: 0
                }}
              />
              <img src="/assets/logo.png" alt="Logo" className="h-40 w-auto relative z-10" />
            </div>

            {/* Login Rules/Benefits */}
            <div className="p-6 rounded-lg shadow-2xl w-full max-w-sm border border-red-600 bg-gray-900/70 text-white text-left space-y-3">
              <img src="/assets/login_rules.png" alt="Login Rules" className="hidden" /> {/* Hidden as text is manually added */}
              <p className="text-red-500 font-bold"># Register and PLAY FOR FREE</p>
              <p># Get 100 FREE CHIPS on every login.</p>
              <p># Great PRIZES and GIFTS to be won on surprise competition.</p>
              <p># NO DEPOSITS (or) any charges required to play on the site.</p>
              <p># No Redemption (or) Cash Winnings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 