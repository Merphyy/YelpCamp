var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');
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
router.post('/', middleware.isLoggedIn, (req,res)=>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name,
        price: price,
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
router.get('/new', middleware.isLoggedIn, (req, res)=>{
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

//edit
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req,res) => {
    //find and update the correct campground
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
            res.redirect('back'); 
        }else{
            res.render('campgrounds/edit', {campground: campground});
        }
    });
});

//update
router.put('/:id', middleware.checkCampgroundOwnership, (req,res) => {
    
    Campground.findByIdAndUpdate({_id: req.params.id},req.body.campground,(err, campground)=>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            //redirect to somewhere (show page)
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
    
});

//delete
router.delete('/:id', middleware.checkCampgroundOwnership, async(req, res) => {
    try {
      let foundCampground = await Campground.findById(req.params.id);
      await foundCampground.remove();
      res.redirect("/campgrounds");
    } catch (error) {
      console.log(error.message);
      res.redirect("/campgrounds");
    }
  });


module.exports = router;