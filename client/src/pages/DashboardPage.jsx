import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import TableCard from '../components/TableCard';
import useAuthStore from '../store/authStore';
import RouletteGif from '../components/RouletteGif';
import RouletteBackground from '../components/RouletteBackground';

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
      <div className="min-h-screen flex items-center justify-center relative">
        <RouletteBackground />
        <div className="text-white text-xl">
          <RouletteGif size={100} />
          <p className="mt-4 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <RouletteBackground />
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 relative">
      <RouletteBackground />
      <div className="container mx-auto">
        <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome, {user?.name}!</h2>
              <p className="text-accent text-xl">Wallet Balance: ₹{user?.wallet}</p>
            </div>
            <RouletteGif size={100} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Available Tables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tables.map((table) => (
            <TableCard key={table._id} table={table} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 