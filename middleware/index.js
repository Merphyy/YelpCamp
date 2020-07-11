//all the middleware
var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require('../models/comment');

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, comment)=>{
            if(err){
                req.flash('error', 'campground not found');
                res.redirect('back');
            }else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash('error', 'You have no permission');
                    res.redirect('back');
                }
            }
        })
    }else{
        req.flash('error', 'Pls login first');
        res.redirect('back');
    }
}

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){        
        //find and update the correct campground
        Campground.findById(req.params.id, (err, campground)=>{
            if(err){
                console.log(err);
                res.redirect('back'); 
            }else{
                //does the user own the campground
                if(campground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash('error', 'You have no permission');
                    res.redirect('back');
                }
                
            }
        });
    }else{
        req.flash('error', 'Plz login first');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', 'Pls Login first!');
        res.redirect('/login');
    }
}

module.exports = middlewareObj;