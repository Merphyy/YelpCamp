var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    seedDB = require('./seeds');


//seedDB();
//connect to database
mongoose.connect('mongodb://localhost/yelp_camp',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds',(req,res)=> {
    //get all campgrounds from db
    Campground.find({}, (err,campgrounds)=>{
        if(err){
            console.log('ERROR!');
        }else{
            res.render('index',{campgrounds:campgrounds});
        }
    });
});

app.post('/campgrounds', (req,res)=>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: description
    }
    //save to database
    Campground.create(newCampground,(err, newlycreated)=>{
        if(err){
            console.log('ERROR!');
        }else{
            //redirect back to campground page
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new',(req, res)=>{
    res.render('new.ejs');
});

//shows more info about campgrounds
app.get('/campgrounds/:id',(req,res)=>{
    //find campground with provided id
    Campground.findById(req.params.id).populate('comments').exec((err,found)=>{
        if(err){
            console.log('ERROR!');
        }else{            
           //render show template with that campground
            res.render('show',{campground: found});
        }
    });
});

app.listen(3000, () => {
    console.log('Server connected!');
});
