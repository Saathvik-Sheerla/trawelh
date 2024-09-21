const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.addReview = async (req,res)=>{
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success", "New Review Added!");
        res.redirect(`/listings/${listing.id}`);
    };


module.exports.removeReview = async (req, res)=>{
        let {id, reviewId} = req.params;
        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
        
        req.flash("deletee", "Review Deleted!");
        res.redirect(`/listings/${id}`);
    }