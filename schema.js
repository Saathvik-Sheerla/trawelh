const Joi = require('joi');

module.exports.ListingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().allow("",null),
        }),
        price: Joi.number().min(0).required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
    }).required(),
});

module.exports.ReviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(0).max(10).required(),
        comment: Joi.string().allow("",null),
    }).required(),
});