const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().min(3),
        image: Joi.string().required().uri(),
        creator: Joi.string().allow('', null),
        username: Joi.string().allow('', null),
        price: Joi.number().required().min(0),
        description: Joi.string().required().min(10),
        location: Joi.string().required().min(3),
        reviews: Joi.string()
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
});