var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

var dbo = require('../database/conn');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// This section will help you get a list of all the records.
router.route('/customers').get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  const collection = dbConnect.collection('customers');
  const count = await collection.count();
  const limit = _req.query.limit ?? 2;
  ///default value for pageNumber should be 1
  const skip = _req.query.pageNumber > 1 ? (((_req.query.pageNumber - 1) * limit)) : 0;

  collection
    .find({})
    .sort({ name: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json({
          message: 'Success', data: result,
          totalCount: count,
        });
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
    .insertOne(req.body, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(201).send({
          message: 'Successfully created',
          data: result,
        });
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

module.exports = router;
