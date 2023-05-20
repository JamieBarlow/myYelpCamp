const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().min(3),
        image: Joi.string().required().uri(),
        creator: Joi.string(),
        username: Joi.string(),
        price: Joi.number().required().min(0),
        description: Joi.string().required().min(10),
        location: Joi.string().required().min(3)
    }).required()
})