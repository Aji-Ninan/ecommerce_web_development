var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products = [
    {
      name: "IPHONE 14 PRO MAX",
      category: "Mobile",
      description: "Best iphone EVERRR!!!",
      image: "data:image/jpeg;base64,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"
    },
    {
      name: "IPHONE 14",
      category: "Mobile",
      description: "Best iphone EVERRR!!!",
      image: "data:image/jpeg;base64,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"
    },
    {
      name: "SAMSUNG GALAXY Z FOLD 4",
      category: "Mobile",
      description: "It folds",
      image: "data:image/jpeg;base64,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"
    },
    {
      name: "SAMSUNG GALAXY Z FLIP 4",
      category: "Mobile",
      description: "It also folds",
      image: "data:image/jpeg;base64,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"
    }
  ]
  res.render('index', { products, admin:true });
});

module.exports = router;
