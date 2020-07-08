var mongoose = require('mongoose');
//set up schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});
//compile schema to a model
module.exports = mongoose.model('Campground',campgroundSchema);
