const express = require('express');
const fs = require('fs');
const app = express();
var logData= []

app.use((req, res, next) => {
    // write your logging code here
    var uA = req.headers['user-agent']
    var date = new Date()
    var isod = date.toISOString();// iso date
    var method = req.method
    var path = req._parsedUrl.path
    var statusCode = 200;//
    var version = 'HTTP/' + req.httpVersion
    var data = uA + ',' + isod + ',' + method + ',' + path + ',' + version + ',' + statusCode + '\n'

    
    var log = {
        'Agent': req.headers['user-agent'],
        'Time': isod,
        'Method': req.method,
        'Resource': req._parsedUrl.path,
        'Version': 'HTTP/' + req.httpVersion,
        'Status': 200
    }
    logData.push(log)

    console.log(data);

    fs.appendFile('./log.csv', data, (err) => {
        if (err) throw err;
        //console.log('The "data to append" was append to file');
    });
    next();
});

app.get('/', (req, res) => {
    // write your code to respond "ok" here
    res.send('ok');
});

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here
   
 
    
  res.json(logData);
  });
    
    
        
    
 
    module.exports = app;
