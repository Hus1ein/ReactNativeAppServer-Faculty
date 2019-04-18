var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {


    let sender = req.param('sender');
    let receiver = req.param('receiver');
    console.log(sender);
    console.log(receiver);
    var jsonPath = path.join(__dirname, '..', 'Database', 'messages.json');
    fs.readFile(jsonPath, 'utf8', function readFileCallback(err, data){
        let result = [];
        if (err){
            console.log(err);
        } else {
            let allMessages = JSON.parse(data);
            for (let i = 0; i < allMessages.length; i++) {
                if (allMessages[i].sender === sender || allMessages[i].receiver === receiver) {
                    result.push(allMessages[i]);
                }
            } 
            res.send({"message_list": result});
            console.log(data);
        }});
});

router.post('/', function(req, res, next) {

    var jsonPath = path.join(__dirname, '..', 'Database', 'messages.json');
    fs.readFile(jsonPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            let newMessage = {
                "sender": req.body.sender,
                "receiver": req.body.receiver,
                "date": new Date(),
                "content": req.body.content,
            };
            let messages = JSON.parse(data); //now it an object
            messages.push(newMessage); //add some data
            let messagesAsString = JSON.stringify(messages); //convert it back to json
            fs.writeFile(jsonPath,messagesAsString, 'utf8', () => {
                res.send(newMessage);
            }); // write it back
        }});
});

module.exports = router;
