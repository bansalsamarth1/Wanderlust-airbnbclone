const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("conneceted to db")
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(MONGO_URL)
}

app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.send("This is the root")
})
//index route
app.get("/listing",async (req,res)=>{
   const allListings = await Listing.find({})
   res.render("listings/index.ejs",{allListings});
    
})

//show route
app.get("/listings/:id",async function(req,res){
    let {id}=req.params;
    // res.send(id)
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs",{listing})
})



// app.get("/testlisting",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangaute,goa",
//         country:"India",
//     })

//    await sampleListing.save()
//    console.log("sample was saved")
//    res.send("succesfull testing")

// })







app.listen(8080,(req,res)=>{
    console.log("server is listening on port 8080")
})