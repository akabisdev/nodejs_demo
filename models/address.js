const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
});

const Address = mongoose.model('Address', addressSchema, 'addresses');

module.exports = Address;