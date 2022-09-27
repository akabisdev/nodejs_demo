var express = require('express');
const { ObjectId, ObjectID } = require('mongodb');
const mongoose = require('mongoose');
var router = express.Router();

const dbo = require('../database/conn');
// const addressSchema = require('../models/address');
const customerSchema = require('../models/customer');

// const Address = mongoose.model('Address', addressSchema);
const Customer = mongoose.model('Customer', customerSchema, 'customers');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// This section will help you get a list of all the records.
router.route('/customers').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('customers')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
router.route('/customers').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    name: req.body.name,
    last_modified: new Date(),
  };

  dbConnect
    .collection('customers')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(201).send(matchDocument);
      }
    });
});

// This section will help you delete a record.
router.route('/customers/:id').delete((req, res) => {
  const dbConnect = dbo.getDb();
  // const list = req.url.split('/')
  const listingQuery = {
    _id: ObjectId(
      req.params.id
    )
  };

  dbConnect
    .collection('customers')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        console.log('1 document deleted');
        res.status(200).send({
          message: 'Deleted successfully'
        });
      }
    });
});

// This section will help you update a record.
router.route('/customers/:id').put((req, res) => {
  const dbConnect = dbo.getDb();

  const whereQuery = {
    _id: ObjectId(req.params.id)
  };

  dbConnect.collection('customers').updateOne(whereQuery, {
    $set: {
      name: req.body.name
    }
  }, (err, _result) => {
    if (err) {
      res.status(400).send(`Something went wrong: ${err.toString()}`);
    } else {
      res.status(200).send({
        message: 'Updated successfully'
      });
    }
  });
});


/////MONGOOSE ::  >>>>>>>>
///Get request
router.route('/m-customers').get(async (req, res) => {

  // Customer.find({}, function (err, customers) {
  //   if (err) {
  //     res.status(400).send(`Something went wrong: ${err.toString()}`);
  //   } else {
  //     // Prints "Space Ghost is a talk show host".
  //     console.log(customers);
  //     res.json(customers);
  //   }
  // });
  try {
    let result = await Customer.find({}).exec();
    res.json(result);
  } catch (e) {
    res.status(400).send(`Something went wrong : ${e.toString()}`);
  }
});

///Get particular record
router.route('/m-customers/:id').get(async (req, res) => {
  try {
    let customerId = ObjectID(req.params.id);
    let result = await Customer.find({ _id: customerId }).exec();
    res.json(result);
  } catch (e) {
    res.status(400).send({ message: `${e.toString()}` });
  }
});

///Post request
router.route('/m-customers').post(async (req, res) => {
  try {
    let customer = req.body;
    let result = await Customer.create(customer);
    res.status(200).send({ message: 'Successfully created', data: result });
  } catch (e) {
    res.status(400).send(`Something went wrong : ${e.toString()}`);
  }
});

module.exports = router;
