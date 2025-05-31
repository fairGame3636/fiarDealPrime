import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import useAuthStore from '../store/authStore';
import RouletteAnimation from '../components/RouletteAnimation';
import RouletteBackground from '../components/RouletteBackground';

const TableDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axiosClient.get(`/tables/${id}`);
        setTable(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch table details');
        setLoading(false);
      }
    };

    fetchTable();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <RouletteBackground />
        <div className="text-white text-xl">
          <RouletteAnimation size={100} speed={2} color="#4CAF50" />
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
        <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">{table.name}</h1>
            <RouletteAnimation size={100} speed={1} color="#4CAF50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary/80 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Table Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>Minimum Bet: ₹{table.minBet}</p>
                <p>Maximum Bet: ₹{table.maxBet}</p>
                <p className="flex items-center">
                  Status:{' '}
                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm ${
                      table.status === 'active'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {table.status || 'active'}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-secondary/80 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Coming Soon</h2>
              <p className="text-gray-300">
                The roulette game interface will be implemented in the next phase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailPage; 