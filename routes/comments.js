var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment'); 

//comments  new routes
router.get('/new', isLoggedIn, (req, res) => {
    //find the campground by id
    Campground.findById(req.params.id, (err,campground) =>{
        if(err){
            console.log('ERROR');
        }else{
            res.render('comments/new', {campground: campground});
        }
    });
});

//comments  save routes
router.post('/', isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            Comment.create(req.body.comment, (err,comment) => {
                if(err){
                    console.log('ERROR');
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save the comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}

module.exports = router;