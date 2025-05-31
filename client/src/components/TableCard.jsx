import React from 'react';
import { Link } from 'react-router-dom';

const TableCard = ({ table }) => {
  // Encode the table name for the URL to handle spaces
  const encodedTableName = encodeURIComponent(table.name);
  
  return (
    <div className="bg-primary rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold text-white mb-2">{table.name}</h3>
      <div className="space-y-2 text-gray-300">
        <p>Min Bet: ₹{table.minBet}</p>
        <p>Max Bet: ₹{table.maxBet}</p>
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
      <Link
        to={`/table/${encodedTableName}`}
        className="mt-4 inline-block bg-accent hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        View Table
      </Link>
    </div>
  );
};

export default TableCard; 