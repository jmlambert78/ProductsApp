// app.js

var express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/product'); // Imports routes for the products
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
// Get CF VCAP credential service values.
var vcap = JSON.parse(process.env.VCAP_SERVICES);
// reconstruct the string as issue on the password encoding...
var mongoDB = 'mongodb://'+vcap["azure-cosmosdb-mongo-account"][0]["credentials"].username+':'+ encodeURIComponent(vcap["azure-cosmosdb-mongo-account"][0]["credentials"].password)+"@"+vcap["azure-cosmosdb-mongo-account"][0]["credentials"].host+':'+vcap["azure-cosmosdb-mongo-account"][0]["credentials"].port+'/?ssl=true&replicaSet=globaldb';

mongoose.connect(mongoDB/*,{useNewUrlParser: true}*/);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

var port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
