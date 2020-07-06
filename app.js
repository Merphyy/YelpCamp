var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var campgrounds = [
    {name: 'Salmon Creek', image: 'https://www.lakegeorge.com/images/benchesonisland.jpg'},
    {name: 'Granite Hill', image: 'https://www.campadk.com/campsiteguide/lincolnpond/20160531/IMG_8065.jpg'},
    {name: 'Mountain Goats', image: 'https://www.fs.usda.gov/Internet/FSE_MEDIA/fseprd526809.jpg'}
]

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds',(req,res)=> {
    res.render('campgrounds',{campgrounds:campgrounds});
});

app.post('/campgrounds', (req,res)=>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    }
    campgrounds.push(newCampground);
    //redirect back to campground page
    res.redirect('/campgrounds');
    
});

app.get('/campgrounds/new',(req, res)=>{
    res.render('new.ejs');
});

app.listen(3000, () => {
    console.log('Server connected!');
});
