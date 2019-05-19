
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        var filetype = file.mimetype;
        var fileformate = filetype.split("/")[1];
        cb(null, req.body.username + '-' + Date.now() + '.' + fileformate)
    }
});

var upload = multer({ storage: storage })

router.post('/', upload.single('myPic'), function (req, res, next) {
    console.log(req.body.username);
    if (req.file) {
        console.log("Upload file...");
    }
    res.send({
        file: req.file
    })
});

router.get('/', function (req, res, next) {
    var fileNames = [];

    fileNames = readDir.readSync('upload/', ['**.png']);  // use async function instead of sync
    var data = {};
    const files = fileNames.map(function (filename) {
        filepath = path.join(__dirname, '../upload') + '/' + filename;
        return readFile(filepath); //updated here
    });

    Promise.all(files).then(fileNames => {
        response.data = fileNames;
        res.json(response);
    }).catch(error => {
        res.status(400).json(response);
    });
});

module.exports = router;
