const Table = require('../models/table.model');
const mongoose = require('mongoose');

const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find({})
      .populate('players', 'name email wallet');
    console.log('Found tables:', tables);
    res.json(tables);
  } catch (error) {
    console.error('Error in getAllTables:', error);
    res.status(400).json({ error: error.message });
  }
};

const getTableById = async (req, res) => {
  try {
    console.log('Searching for table with ID:', req.params.id);
    
    // First try to find by name
    let table = await Table.findOne({ name: req.params.id });
    console.log('Table found by name:', table);
    
    // If not found by name, try to find by MongoDB ObjectId
    if (!table) {
      try {
        const objectId = new mongoose.Types.ObjectId(req.params.id);
        table = await Table.findById(objectId);
        console.log('Table found by ObjectId:', table);
      } catch (err) {
        console.log('Error converting to ObjectId:', err);
      }
    }
    
    if (!table) {
      console.log('No table found');
      return res.status(404).json({ error: 'Table not found' });
    }
    
    // Populate players if needed
    table = await table.populate('players', 'name email wallet');
    console.log('Table with populated players:', table);
    
    res.json(table);
  } catch (error) {
    console.error('Error in getTableById:', error);
    res.status(400).json({ error: error.message });
  }
};

const createInitialTables = async () => {
  try {
    // Clear existing tables
    await Table.deleteMany({});
    console.log('Cleared existing tables');
    
    const tables = [
      {
        name: 'Table 1',
        minBet: 10,
        maxBet: 1000,
        players: [],
        status: 'waiting'
      },
      {
        name: 'Table 2',
        minBet: 50,
        maxBet: 5000,
        players: [],
        status: 'waiting'
      }
    ];

    const createdTables = await Table.insertMany(tables);
    console.log('Initial tables created:', createdTables);
  } catch (error) {
    console.error('Error creating initial tables:', error);
  }
};

module.exports = {
  getAllTables,
  getTableById,
  createInitialTables
}; 