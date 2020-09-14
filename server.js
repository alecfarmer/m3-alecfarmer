// James Alec Farmer
const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.static("public"));
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Listening on port 3000");
})