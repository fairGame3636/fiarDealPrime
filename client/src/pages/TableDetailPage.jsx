import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
// import useAuthStore from '../store/authStore'; // Unused
// import RouletteAnimation from '../components/RouletteAnimation'; // Unused

const TableDetailPage = () => {
  const { id } = useParams();
  // const { user } = useAuthStore(); // Unused
  const [table, setTable] = useState(null);
  // const [loading, setLoading] = useState(true); // Unused
  // const [error, setError] = useState(null); // Unused

  useEffect(() => {
    const fetchTable = async () => {
      try {
        // Still fetch table data to get the name for the background image
        const response = await axiosClient.get(`/tables/${id}`);
        setTable(response.data);
        // setLoading(false); // Unused
      } catch (err) {
        // setError('Failed to fetch table details'); // Unused
        // setLoading(false); // Unused
        console.error("Failed to fetch table for background", err); // Log error instead
      }
    };

    fetchTable();
  }, [id]);

  // Only render the background if table data is available
  if (!table) {
    return <div className="min-h-screen w-screen bg-gray-800"></div>; // Simple placeholder while fetching
  }

  // Set background based on table name
  const backgroundImage = `url("/assets/${table.name === 'Table 1' ? 'BlueTableLatest.png' : table.name === 'Table 2' ? 'GreenTableLatest.png' : 'bg.png'}")`;

  return (
    <div 
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage }}
    >
      {/* All other content removed - only background is displayed */}
    </div>
  );
};

export default TableDetailPage; 