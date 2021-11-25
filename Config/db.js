const mongoose = require('mongoose');
require('dotenv').config()
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
let connect = (options) =>{
    // var connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    var connectionString = `mongodb+srv://sachin:XReivM35vXKLqb5Y@cluster0.oiold.mongodb.net/payuCrat?retryWrites=true&w=majority`;
    // var connectionString = `mongodb+srv://sachin:XReivM35vXKLqb5Y@cluster0.oiold.mongodb.net/bookcare?retryWrites=true&w=majority`;
     mongoose.connect(connectionString,options);
     mongoose.connection.on('connected', function () {
      
        console.log(("Mongoose default connection is open to ", connectionString));
    });
    mongoose.connection.on('error', function (err) {
        console.log(("Mongoose default connection has occured " + err + " error"));
    });
        mongoose.connection.on('disconnected', function () {
        console.log(("Mongoose default connection is disconnected"));
    });
}

module.exports = {connect}