var express = require('express');
var app = express();

app.use('/build', express.static(__dirname + '/build'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/templates', express.static(__dirname + '/templates'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/json', express.static(__dirname + '/json'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});

app.listen(8282); //the port you want to use