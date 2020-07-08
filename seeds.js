var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

var data = [
    {
        name: 'Clouds Rest', 
        image: 'https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg', 
        description: 'This is the clouds rest' 
    },
    {
        name: 'Forest Hill', 
        image: 'https://s3.amazonaws.com/socast-superdesk/media/20200525190536/6404f2f2-e5a6-47cb-bb7a-bf11c17f715b.jpg', 
        description: 'This is the Forest Hill' 
    },
    {
        name: 'Lake Walden', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQC9vJjBJkVLFIjk_7A-8WOFxykaZ6nwi6eUQ&usqp=CAU', 
        description: 'This is the Lake Walden' 
    }
];

// function seedDB(){
//     //remove all campgrounds
//     Campground.deleteMany({},(err) => {
//         if(err){
//             console.log('ERROR');
//         }
//         console.log('removed campgrounds!');
//         //add a few campgrounds
//         data.forEach((e)=>{
//             Campground.create(e, (err, campground)=>{
//                 if(err){
//                     console.log('ERROR');
//                 }else{
//                     console.log('added a campground');
//                     //add a few comments
//                     Comment.create({
//                         text: 'This place is great',
//                         author: 'Homer'
//                     },(err, comment)=>{
//                         if(err){
//                             console.log('ERROR');
//                         }else{
//                             campground.comments.push(comment);
//                             campground.save();
//                             console.log('added a comment');
//                         }
//                     })
//                 }
//             });
//         });
//     });
// }

function seedDB(){
//Remove all campgrounds
Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds!");
    Comment.remove({}, function(err) {
        if(err){
            console.log(err);
        }
        console.log("removed comments!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
}); 
//add a few comments
}
module.exports = seedDB;
