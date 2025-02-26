const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session); //The reason require('connect-mongodb-session')(session) contains a function call is because connect-mongodb-session is a function that returns a class when executed.
// const db = require('./util/database') // and result of the function call is stored in mongoDBStore

const MONGO_URI = 'mongodb+srv://vinitaperions:1HvP8D4pDQYRSgWx@cluster0.x6fng.mongodb.net/shop';

const app = express();
const store = new mongoDBStore({
    uri: MONGO_URI,
    collection: 'sessions'
})

app.set('view engine', 'ejs');
// app.set('view engine','hbs');
app.set('views', 'views');

const authRouts = require('./routes/auth');
const adminRouts = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //this is used to serve static files like css, images, etc
app.use(
    //initialize session
    session({
        secret: 'My secret',
        resave: false,
        saveUninitialized: false,
        store: store // your session data will be store by using this
    })
);

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
app.use(authRouts); // every request will go in the shopRoutes if anything is not found then go into the authRouts and authRouts will handle them


// Move the 404 error handler to the end
app.use(errorController.get404Page);

// mongoose.connect('mongodb+srv://vinitaperions:1HvP8D4pDQYRSgWx@cluster0.x6fng.mongodb.net/shop') // we can change database 'name' collection folder name before .net/' name ' 
mongoose.connect(MONGO_URI)
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
    }).catch(err => {
        console.log(err);
    });
