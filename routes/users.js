var express = require('express');
var router = express.Router();

var dbo = require('../database/conn');

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
  const listingQuery = { _id: req.body.id };

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

module.exports = router;
