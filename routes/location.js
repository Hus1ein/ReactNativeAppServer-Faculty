var express = require('express');
var router = express.Router();
var fs = require('fs');
let locationsService = require('../Database/LocationsService');
let usersService = require('../Database/UsersService');

router.get('/', function(req, res, next) {

    if (req.headers.authorization != null) {
        usersService.getUserByUsername(req.headers.authorization, (user) => {

           if (user != null) {
               locationsService.getAll((locations) => {
                   res.status(200).send({"location_list": locations});
               })
           } else {
               res.status(403).send("unauthorized");
           }
        });
    } else {
        res.status(403).send("unauthorized");
    }

});

router.post('/', function(req, res, next) {

    if (req.headers.authorization != null) {
        usersService.getUserByUsername(req.headers.authorization, (user) => {
            if (user != null) {
                let newLocation = {
                    "person": user.username,
                    "coordinate": {
                        "latitude": req.body.latitude,
                        "longitude": req.body.longitude
                    }
                };
                locationsService.create(newLocation, (location) => {
                    res.status(201).send({"location": location});
                })
            } else {
                res.status(403).send("unauthorized");
            }
        });
    } else {
        res.status(403).send("unauthorized");
    }

});

module.exports = router;
