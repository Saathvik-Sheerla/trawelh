const mongoose = require('mongoose');
const schema = mongoose.Schema;

const listingSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: Object,
        filename: "listingimage",
        default: "https://images.unsplash.com/photo-1722872596445-4e51321ccb51?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v===""?
        "https://images.unsplash.com/photo-1722872596445-4e51321ccb51?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        :v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing =  mongoose.model("Listing",listingSchema);
module.exports = Listing;