var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {

    fs.readFile('Database.json', 'utf8', function readFileCallback(err, data){
        let locations;
        if (err){
            console.log(err);
        } else {
            locations = JSON.parse(data);
            res.send(locations);
            console.log(data);
        }});
});

router.post('/', function(req, res, next) {

    fs.readFile('Database.json', 'utf8', function readFileCallback(err, data){
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
            let locations = JSON.parse(data); //now it an object
            locations.push(newLocation); //add some data
            let locationsAsString = JSON.stringify(locations); //convert it back to json
            fs.writeFile('Database.json', locationsAsString, 'utf8', () => {
                res.send(newLocation);
            }); // write it back
        }});
});

module.exports = router;
