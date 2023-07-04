const mongoose = require('mongoose');
const Review = require('./review');
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
    // uploadedImages: [
    //     {
    //         url: String,
    //         filename: String
    //     }
    // ],
    creator: String,
    username: String,
    price: {
        type: Number,
        min: [1, 'Price must be greater than 0']
    },
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId, ref: 'Review'
        }
    ]
})

CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        console.log(doc)
        await Review.deleteMany({_id: {$in: doc.reviews}})
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);