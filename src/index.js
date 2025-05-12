const express = require('express');
const app = express();
require('dotenv').config();
const db= require('./config/db')
const cookieParser=require('cookie-parser')

app.use(express.json()); //json to java script object conversion 
app.use(cookieParser); //string k form m cokkie aayegi usko parse krk object ki form m kr dega readibility bdhane k liye 




console.log(process.env.PORT); // Should print 3000
main()
.then(async()=>{
    app.listen(process.env.PORT, () => {
    console.log("Server listening at " + process.env.PORT);
    });
})
.catch(err=>{
    console.log("error occured"+err);
})

