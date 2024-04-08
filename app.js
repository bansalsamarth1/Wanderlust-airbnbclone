const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));


app.get("/",function(req,res){
    res.send("This is the root")
})
//index route
app.get("/listings",async (req,res)=>{
   const allListings = await Listing.find({})
   res.render("listings/index.ejs",{allListings});
    
})

//new route
app.get("/listings/new",function(req,res){
    res.render("listings/new.ejs")
})


//show route
app.get("/listings/:id",async function(req,res){
    let {id}=req.params;
    // res.send(id)
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs",{listing})
})

//create route
app.post("/listings",async function(req,res){
    // let{title,description,image,price,country,location}=req.body;
 const newListing=   new Listing(req.body.listing);
 await newListing.save();
    console.log(newListing)
    res.redirect("/listings")
})

//edit route
app.get("/listings/:id/edit",async function(req,res){
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing});
})
//update route
app.put("/listings/:id",async(req,res)=>{
let {id}=req.params;
await Listing.findByIdAndUpdate(id, {...req.body.listing})
res.redirect("/listings")
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