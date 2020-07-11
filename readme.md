#YelpCamp


1.
Add landing Page
Add Campgrounds Page that lists all Campgrounds

Each Campgrounds hasL
Name
Image 


2.layout and basic styling
create our header and footer partials
add in bootstrap

3.creating new campgrounds
setup new campground post route
add in body-parser
setup route to show form
add basic unstyled form

4.style the campground page
add a better header/title
make campgrounds display in a grid

5.style the Navbar and Form
add a navbar to all templates style the new campground form

6.add mongoose
install and configure mongoose
setup campground model
use campground model inside of our routes

7.show page
review the restful routes we've seen so far
add description to our campgroundmodel
show db.collection.drop()
add a show route/template

8.refactor mongoose code
create a models directory
use module.exports
require everything correctly

9.add seeds file
add a seeds.js file
run the seeds file every time the server starts

10.add the comment model
make our errors go away
display comments on campground show page

11.comment new/create
discuss nested routes
add the comment new and create routes
add the new comment form

12.style show page
add side bar to show page
display comments nicely

13.finish styling show page
add public directory
add custom stylesheet

14.add user model
install all packages needed for auth
define User model

15.register
configure passport
add register routes
add register template

16.login
add login routes
add login templates

17.logout/navbar
add logout route
prevent user from adding a comment if not signed in
add links to navbar

18.show/hide links
show/hide auth links in side bar correctly

19.refacor the routes
use express Routes to reorganize all routes

20.users + comments
associate users and comments
save author's name to a comment automatically

21.users + campgrounds
prevent an unauthenticated user from creating a campground
save username + id to newlu created campgound

22.editing campgrounds
add method-override
add edit route for campgrounds
add link to edit page
add update route
fix & set problem


23.deleting campgrounds
add destroy route
add delete button

24.authorization
user can only edit his/her campgrounds
user can only delete his/her campgrounds
hide/show edit and delete button

25.editing comments
add edit route for comments
add edit button
add update route

26.deleting comments
add destroy route
add delete btn

27.authorization comments
user can only edit his/her comments
user can only delete his/her comments
hide/show edit and delete buttons
refactor middleware

28.adding in Flash
demo working version
install and configure connect-flash
add bootstrap alerts to header



