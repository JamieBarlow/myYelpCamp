const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Name cannot be blank']
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL']  
    },
    creator: String,
    username: String,
    price: {
        type: Number,
        min: [1, 'Price must be greater than 0']
    },
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema);