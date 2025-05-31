const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'waiting',
    enum: ['waiting', 'spinning', 'ended']
  },
  minBet: {
    type: Number,
    required: true,
    default: 10
  },
  maxBet: {
    type: Number,
    required: true,
    default: 1000
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table; 