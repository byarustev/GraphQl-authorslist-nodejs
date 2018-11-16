const express = require('express');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const graphQlHTTP = require('express-graphql'); // helps express understand graphql
//we use it as middleware to a single route

mongoose.connect('mongodb://test-user:test-user1@ds161856.mlab.com:61856/graphql-test-db');
mongoose.connection.once('open',()=>{
    console.log("connected to database");
});

const app = express(); // create the app
app.use('/graphql',graphQlHTTP({
    schema,
    graphiql:true
}));

//port and call back function
app.listen(5000, ()=>{
    console.log("Now listening on port 5000");
});

