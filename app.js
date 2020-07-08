var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/yelp_camp',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

//set up schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
//compile schema to a model
var Campground = mongoose.model('Campground',campgroundSchema);

// Campground.create({
//     name: 'Granite Hill', 
//     image: 'https://www.campadk.com/campsiteguide/lincolnpond/20160531/IMG_8065.jpg',
//     description: 'This is a huge granite hill, no bathrooms. No water, beautiful granite.'
// },(err,camp)=>{
//     if(err){
//         console.log('ERROR!');
//     }else{
//         console.log('We have added a campground');
//         console.log(camp);
//     }
// });



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

//show shows more info about campgrounds
app.get('/campgrounds/:id',(req,res)=>{
    //find campground with provided id
    Campground.findById(req.params.id,(err,found)=>{
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
