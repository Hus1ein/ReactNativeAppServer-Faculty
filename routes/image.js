const express = require('express');
let multer = require('multer');
const path = require('path');
const fs = require('fs');
const image2base64 = require('image-to-base64');
const imagesService = require('../Services/ImagesService');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        var filetype = file.mimetype;
        var fileformate = filetype.split("/")[1];
        cb(null, req.user.username + '-' + Date.now() + '.' + fileformate)
    }
});

let upload = multer({ storage: storage });

router.post('/', upload.single('myPic'), function (req, res, next) {

    if (req.file) {
        image2base64(path.join(__dirname, '../') + req.file.path)
            .then(
                (response) => {
                    fs.unlinkSync(path.join(__dirname, '../') + req.file.path);

                    let newImage = {
                        "createAt": new Date(),
                        "username": req.user.username,
                        "image": response,
                    };

                    imagesService.create(newImage, (createdImage) => {
                        res.status(201).send("created");
                    });

                }
            )
            .catch(
                (error) => {
                    console.log(error);
                    res.status(400).send("Bad file");
                }
            )
    } else {
        res.status(400).send("Bad request");
    }

});

router.get('/', function (req, res, next) {

    imagesService.findAll(req.user.username, (images) => {
        res.status(200).send(images);
    })

});

module.exports = router;
