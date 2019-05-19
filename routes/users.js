var express = require('express');
var router = express.Router();
let userService = require('../Database/UsersService');

//Login
router.post('/', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    userService.validationUser(username, password, (result) => {
        if (result === true) {
            res.status(200).send("successfully logged in");
        } else {
            res.status(401).send("Error");
        }
    });

});

module.exports = router;
