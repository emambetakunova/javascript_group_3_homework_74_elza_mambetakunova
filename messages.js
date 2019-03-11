const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './messages';

router.post('/', (req, res) => {
    const date = new Date().toISOString();
    let fileName = './messages/' + date  + '.txt';
    const message = {
        message: req.body.message,
        datetime: date
    };
    fs.writeFileSync(fileName, JSON.stringify(message));
    res.send({message: req.body.message, datetime: date});
});

router.get('/', (req, res) => {
    fs.readdir(path, (err, files) => {
        let messages = [];
        files = files.slice(-5);
        files.forEach(file => {
            const fileText = fs.readFileSync(path + '/' + file);
            messages.push(JSON.parse(fileText));
        });
        res.send(messages);
    });
});



module.exports = router;