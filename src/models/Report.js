// models/Report.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  date: { type: Date, default: Date.now },
  users_eaten: [{ type: String }],
  total_amount: { type: Number, default: 0 }
});

// Create a model using the schema
const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
