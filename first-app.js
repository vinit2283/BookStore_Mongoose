const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');
// const db = require('./util/database') 

const app = express();

app.set('view engine', 'ejs');
// app.set('view engine','hbs');
app.set('views', 'views');

const adminRouts = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //this is used to serve static files like css, images, etc

app.use((req, res, next) => {
    User.findById('67bc37038c80101b3a2df835')
        .then(user => {
            // req.user = new User(user.name, user.email, user.cart, user._id);
            req.user = user; //this will make the user object available in all the requests, so that we can use it in the views
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use('/admin', adminRouts);
app.use(shopRoutes);


// Move the 404 error handler to the end
app.use(errorController.get404Page);

mongoose.connect('mongodb+srv://vinitaperions:1HvP8D4pDQYRSgWx@cluster0.x6fng.mongodb.net/shop') // we can change database 'name' collection folder name before .net/' name ' 
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Vinit',
                    email: 'vinitaperions@gmail.com',
                    cart: {
                        items: []
                    }
                })
                user.save()
            }
        })
        console.log('Connected to database');
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
