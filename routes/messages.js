const express = require('express');
const messagesService = require('../Services/MessagesService');
const usersService = require('../Services/UsersService');
let router = express.Router();

router.get('/', function(req, res, next) {

    if (req.user.username === req.query.firstUser || req.user.username === req.query.secondUser) {

        messagesService.findAll(req.query.firstUser, req.query.secondUser, (result) => {
            res.status(200).send(result);
        });

    } else {
        res.status(403).send("Forbidden");
    }

});

router.post('/', function(req, res, next) {

    usersService.getUserByUsername(req.body.receiver, (user) => {
        if (user != null) {
            let newMessage = {
                "sender": req.user.username,
                "receiver": req.body.receiver,
                "date": new Date(),
                "content": req.body.content,
            };

            messagesService.create(newMessage, (createdMessage) => {
                res.status(201).send(createdMessage);
            });
        } else {
            res.status(400).send("Bad request");
        }
    })

});

module.exports = router;
