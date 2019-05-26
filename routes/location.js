const express = require('express');
let locationsService = require('../Services/LocationsService');
let router = express.Router();

router.get('/', function(req, res, next) {

    locationsService.findAll((locations) => {
        res.status(200).send(locations);
    });

});

router.post('/', function(req, res, next) {

    let newLocation = {
        "person": req.user.username,
        "coordinate": {
            "latitude": req.body.latitude,
            "longitude": req.body.longitude
        },
        "createdAt": new Date()
    };

    locationsService.create(newLocation, (location) => {
        res.status(201).send(location);
    });

});

module.exports = router;
