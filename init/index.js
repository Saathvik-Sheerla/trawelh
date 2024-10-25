const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const initData = require('./data.js');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main().then(()=>{
    console.log("database connected DB");
}).catch((err)=>{
    console.log(err);
});

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '671c783696158a447f228b58'}));
    await Listing.insertMany(initData.data);
    console.log("Data is initialised");
}

initDB();

