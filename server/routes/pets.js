var express = require('express');
var router = express.Router();
var Pet = require('../models/pet');

//counts the number of favorite pets
router.get('/', function (req, res) {
  Pet.count({}, function (err, count) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send({numFavorites : count});
  });
});





module.exports = router;
