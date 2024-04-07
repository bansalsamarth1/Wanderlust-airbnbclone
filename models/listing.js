const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String, // Assuming image is stored as a URL
        default:"https://plus.unsplash.com/premium_photo-1681550097108-187abe10d445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWF8ZW58MHx8MHx8fDA%3D",
        set:(v)=> v === "" ? "https://plus.unsplash.com/premium_photo-1681550097108-187abe10d445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWF8ZW58MHx8MHx8fDA%3D" : v,
    },
    price: {
        type: Number,
        
    },
    location: {
        type: String,
        
    },
    country: {
        type: String,
        
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;