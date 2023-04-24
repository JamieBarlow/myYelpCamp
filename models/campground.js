const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    creator: String,
    username: String,
    price: Number,
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema);