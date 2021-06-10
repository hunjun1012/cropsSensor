const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const app = express();

const admin = require('firebase-admin');
// admin.initializeApp();

//"YYYY-MM-DD hh:mm:ss" 시간 형식

// var requestTime = function (req, res, next) {
//     req.requestTime = new Date().toLocaleString(),
//     next();
//   };
//   app.use(requestTime);

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

app.use(cors({ origin: true }));

/* app.get('/:id/:value', (req, res) => {  
    admin.database().ref('/sensor/' + req.params.id).set( req.params.value);
    returnVal = {
        'sesnorId': req.params.id,
        'status':'OK',
        'value': req.params.value,
        'time': new Date().addHours(9),
        'message': req.params.id + " is set to " + req.params.value,
    }
    res.send(returnVal);
}); */

app.post('/sensor', (req, res) => {  
    res.send("sensor post");
});

app.get('/command', (req, res) => {
    admin.database().ref('/sensor/command').on('value', (val) => {
        returnVal = val;
        res.send(returnVal);
    })
});


app.post('/', (req, res) => {
    //var json = '{"result":true, "count":42}';
    functions.logger.log(req.body);
    var jsonString = req.body.sensor;
    var json = JSON.parse(jsonString);
    functions.logger.log(json);
    admin.database().ref('/sensor/').update(json);
    returnVal = {
        'status':'OK',
        'value': json,
        'time': new Date().addHours(9),
        'message': "sensor value was setted",
    }
    res.send(returnVal);
});

app.put('/:id', (req, res) => res.send('put' + req.params.id));

app.delete('/:id', (req, res) => res.send('del' + req.params.id));

app.get('/', (req, res) => res.send(req.body));


module.exports = app;
