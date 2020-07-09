var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');


//seedDB();
//connect to database
mongoose.connect('mongodb://localhost/yelp_camp',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Merphy project',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


app.get('/', (req, res) => {
    res.render('landing');
});
//index
app.get('/campgrounds',(req,res)=> {
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

//new
app.get('/campgrounds/new',(req, res)=>{
    res.render('campgrounds/new.ejs');
});

//shows more info about campgrounds
app.get('/campgrounds/:id',(req,res)=>{
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

//comments routes
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
    //find the campground by id
    Campground.findById(req.params.id, (err,campground) =>{
        if(err){
            console.log('ERROR');
        }else{
            res.render('comments/new', {campground: campground});
        }
    });
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            Comment.create(req.body.comment, (err,comment) => {
                if(err){
                    console.log('ERROR');
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    
});

//Auth Routes
//register
app.get('/register', (req,res)=>{
    res.render('register');
});

app.post('/register', (req,res)=>{
    User.register(new User({username: req.body.username}), req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            res.render('register');
        }
        //if register is ok then login the user
        passport.authenticate('local')(req, res, ()=>{
            res.redirect('/campgrounds');
        });
    });
});

//login
app.get('/login', (req, res)=>{
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res)=>{
    
});

//logout
app.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/campgrounds');
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }

}

app.listen(3000, () => {
    console.log('Server connected!');
});
 