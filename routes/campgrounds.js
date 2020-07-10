var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
//index
router.get('/',(req,res)=> {
    //get all campgrounds from db
    Campground.find({}, (err,campgrounds)=>{
        if(err){
            console.log('ERROR!');
        }else{
            res.render('campgrounds/index',{campgrounds:campgrounds, currentUser: req.user});
        }
    });
});

//create
router.post('/', isLoggedIn, (req,res)=>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    //save to database
    Campground.create(newCampground,(err, newlycreated)=>{
        if(err){
            console.log('ERROR!');
        }else{
            //redirect back to campground page
            console.log(newlycreated);
            res.redirect('/campgrounds');
        }
    });
});

//new
router.get('/new', isLoggedIn, (req, res)=>{
    res.render('campgrounds/new.ejs');
});

//shows more info about campgrounds
router.get('/:id',(req,res)=>{
    //find campground with provided id
    Campground.findById(req.params.id).populate('comments').exec((err,found)=>{
        if(err){
            console.log('ERROR!');
        }else{            
           //render show template with that campground
            res.render('campgrounds/show',{campground: found});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = router;