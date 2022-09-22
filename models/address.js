const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    pincode: String,
});

const Address = mongoose.model('Address', addressSchema,);

module.exports = Address;