const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
