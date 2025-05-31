import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import RouletteGif from '../components/RouletteGif';
import RouletteBackground from '../components/RouletteBackground';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    deviceId: crypto.randomUUID()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <RouletteBackground />
      <div className="bg-black/80 backdrop-blur-md p-8 rounded-lg shadow-2xl w-full max-w-md border border-white/10">
        <div className="mb-8">
          <RouletteGif size={150} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        {error && (
          <div className="bg-red-500/90 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:border-accent focus:outline-none transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:border-accent focus:outline-none transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:border-accent focus:outline-none transition-colors duration-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow-lg hover:shadow-accent/20"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage; 