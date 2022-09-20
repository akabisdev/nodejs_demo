const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    pincode: String,
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;