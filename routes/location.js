var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {

    var jsonPath = path.join(__dirname, '..', 'Database', 'locations.json');
    fs.readFile(jsonPath, 'utf8', function readFileCallback(err, data){
        let locations;
        if (err){
            console.log(err);
        } else {
            locations = JSON.parse(data);
            res.send({"location_list": locations});
            console.log(data);
        }});
});

router.post('/', function(req, res, next) {

    var jsonPath = path.join(__dirname, '..', 'Database', 'locations.json');
    fs.readFile(jsonPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            let newLocation = {
                "person": req.body.person,
                "coordinate": {
                    "latitude": req.body.latitude,
                    "longitude": req.body.longitude
                }
            };
            let locations = JSON.parse(data);
            locations.push(newLocation);
            let locationsAsString = JSON.stringify(locations);
            fs.writeFile(jsonPath, locationsAsString, 'utf8', () => {
                res.send(newLocation);
            }); // write it back
        }});
});

module.exports = router;
