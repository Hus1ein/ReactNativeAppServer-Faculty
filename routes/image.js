var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const fs = require('fs');
const image2base64 = require('image-to-base64');
let usersService = require('../Database/UsersService');
let imagesService = require('../Database/ImagesService');
var resizebase64 = require('resize-base64')

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

var upload = multer({ storage: storage });

router.post('/', upload.single('myPic'), function (req, res, next) {
    if (req.headers.authorization != null) {
        usersService.getUserByUsername(req.headers.authorization, (user) => {
            if (user != null) {
                if (req.file) {
                    image2base64(path.join(__dirname, '../') + req.file.path)
                        .then(
                            (response) => {
                                fs.unlinkSync(path.join(__dirname, '../') + req.file.path);
                                let newImage = {
                                    "createAt": new Date(),
                                    "username": user.username,
                                    "image": response,
                                };
                                imagesService.create(newImage, (createdImage) => {
                                    res.status(201).send("created");
                                });
                            }
                        )
                        .catch(
                            (error) => {
                                console.log(error); //Exepection error....
                                res.status(400).send("Bad file");
                            }
                        )
                } else {
                    res.status(400).send("No file");
                }
            } else {
                res.status(403).send("unauthorized");
            }
        });
    } else {
        res.status(403).send("unauthorized");
    }

});

router.get('/', function (req, res, next) {
    if (req.headers.authorization != null) {
        usersService.getUserByUsername(req.headers.authorization, (user) => {

            if (user != null) {
                imagesService.getAllByUserId(user.username, (images) => {
                    res.status(200).send(images);
                })
            } else {
                res.status(403).send("unauthorized");
            }
        });
    } else {
        res.status(403).send("unauthorized");
    }
});

router.get("/image.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/../upload/newspaper.png"));
});
//new changes
module.exports = router;
