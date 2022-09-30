const mongoose = require('mongoose');
const validator = require('validator');
const Address = require('./address');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    addresses: [
        {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'addresses'

        }
    ]
});

// const Customer = mongoose.model('Customer', customerSchema, 'customers');

module.exports = customerSchema;