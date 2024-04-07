const express = require("express");
const app = express();
const mongoose = require("mongoose")


app.get("/",function(req,res){
    res.send("This is the root")
})









app.listen(8080,(req,res)=>{
    console.log("server is listening on port 8080")
})