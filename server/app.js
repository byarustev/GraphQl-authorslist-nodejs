const express = require('express');


const graphQlHTTP = require('express-graphql'); // helps express understand graphql
//we use it as middleware to a single route

const app = express(); // create the app
app.use('/graphql',graphQlHTTP({

}));

//port and call back function
app.listen(5000, ()=>{
    console.log("Now listening on port 5000");
});

