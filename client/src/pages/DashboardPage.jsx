import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import useAuthStore from '../store/authStore';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axiosClient.get('/tables');
        setTables(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tables');
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-900 text-xl">
          <img src="/assets/Spin Spinning GIF by Sealed With A GIF.gif" alt="Roulette Animation" style={{ width: 100, height: 100 }} />
          <p className="mt-4 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const table1Data = tables.find(table => table.name === 'Table 1');
  const table2Data = tables.find(table => table.name === 'Table 2');

  return (
    <>
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10" style={{
        backgroundImage: 'url("/assets/bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}></div>

      {/* Overlay Layer */}
      <div className="fixed inset-0 -z-10 opacity-50" style={{
        backgroundImage: 'url("/assets/bg-overlay-dash.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}></div>

      {/* Content Wrapper - centers the box and side menu */}
      <div className="relative z-10 container mx-auto mt-16 flex flex-col md:flex-row justify-center items-center md:items-center space-y-8 md:space-y-0 md:space-x-8">

        {/* Glowing Golden Box */}
        <div className="relative w-full max-w-sm md:max-w-4xl p-8 flex justify-center items-center border-4 border-yellow-400 rounded-3xl shadow-[0_0_40px_rgba(255,215,0,0.5)] bg-black/40 backdrop-blur-md min-h-[calc(100vh-14rem)] flex-col landscape:min-h-[calc(100vh-10rem)]">

          {/* Logo with Glow */}
          <div className="relative flex items-center justify-center -mt-10 mb-8"> {/* Added w-full back for centering */}
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

          {/* Roulette Tables */}
          <div className="flex flex-wrap justify-center items-center gap-8 w-full">
            {table1Data && (
              <Link to={`/table/${encodeURIComponent(table1Data.name)}`}>
                <img src="/assets/table1.png" alt="Table 1" className="w-40 h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer" />
              </Link>
            )}
            {table2Data && (
              <Link to={`/table/${encodeURIComponent(table2Data.name)}`}>
                <img src="/assets/table2.png" alt="Table 2" className="w-40 h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer" />
              </Link>
            )}
          </div>
        </div>

        {/* Side Menu */}
        <div className="flex flex-col items-center space-y-4 mt-20"> {/* Adjusted top margin to align with box content */}
          {/* Roulette Games Icon */}
          <div className="relative flex items-center">
            <img src="/assets/arrow.png" alt="Arrow" className="h-6 w-auto absolute -left-6" /> {/* Position arrow to the left */}
            <img src="/assets/icon.png" alt="Roulette Games" className="h-16 w-auto" /> {/* Adjust size */}
          </div>
          {/* Add other game category icons here */} 
          {/* Example:
          <div className="relative flex items-center">
              <img src="/assets/arrow.png" alt="Arrow" className="h-6 w-auto absolute -left-6" />
              <img src="/assets/card_games_icon.png" alt="Card Games" className="h-16 w-auto" />
            </div>
          */}
        </div>

      </div>
    </>
  );
};

export default DashboardPage;
