var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
let messagesService = require('../Database/MessagesService');
let usersService = require('../Database/UsersService');

router.get('/', function(req, res, next) {

    if (req.headers.authorization != null) {
        usersService.getUserByUsername(req.headers.authorization, (user) => {

            if (user != null) {
                let sender = user.username;
                let receiver = req.param('receiver');
                console.log(sender);
                console.log(receiver);
                messagesService.getAll(sender, receiver, (result) => {
                    res.send({"message_list": result});
                    console.log(result);
                });
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
                let newMessage = {
                    "sender": user.username,
                    "receiver": req.body.receiver,
                    "date": new Date(),
                    "content": req.body.content,
                };

                messagesService.create(newMessage, (createdMessage) => {
                    res.send(createdMessage);
                });
            } else {
                res.status(403).send("unauthorized");
            }
        });
    } else {
        res.status(403).send("unauthorized");
    }

});

module.exports = router;
