var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var multer  = require('multer');
// var upload = multer({ dest: 'public/' })

router.post('/avatar', (req, res, next) => {
  console.log(req, 12221211)
})
module.exports = router;