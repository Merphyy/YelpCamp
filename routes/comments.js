var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment'); 
var middleware = require('../middleware')

//comments new routes
router.get('/new', middleware.isLoggedIn, (req, res) => {
    //find the campground by id
    Campground.findById(req.params.id, (err,campground) =>{
        if(err){
            console.log('ERROR');
        }else{
            res.render('comments/new', {campground: campground});
        }
    });
});

//comments save routes
router.post('/', middleware.isLoggedIn, (req, res) =>{
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
                    req.flash('success', 'Successfully added a comment');                    
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    
});

//edit
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, comment)=>{
        if(err){
            res.redirect('back');
        }else{
            res.render('comments/edit', {campground_id: req.params.id, comment: comment});
        }
    });
    
});

//update
router.put('/:comment_id', middleware.checkCommentOwnership, (req,res) =>{
    Comment.findOneAndUpdate({_id: req.params.comment_id}, req.body.comment, (err, comment)=>{
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/campgrounds/'+ req.params.id );
        }
    });
});

//delete
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
    Comment.findOneAndDelete({_id: req.params.comment_id},(err)=>{
        if(err){
            res.redirect('back');
        }else{
            req.flash('success', 'Comment deletes');
            res.redirect('/campgrounds/'+ req.params.id);
        }
    })
});

module.exports = router;