
const mongoose = require('mongoose');
const Address = require('./address');
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        default: 0
    },
    address: [
        {
            type: Address.schema,
        }
    ]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = customerSchema;