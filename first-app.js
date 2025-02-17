// fs.writeFileSync('hello.txt', 'Hello from Node.js'); //The writeFileSync method is writing the string 'Hello from Node.js' to a file named hello.txt. If the file does not exist, it will be created. If it does exist, its content will be overwritten.

// const http = require('http');
// const routes = require('./routs');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

// const expressHbs = require('express-handlebars');

const app = express();  

// app.engine('hbs', 
//     expressHbs({
//         layoutsDir: 'views/layouts', 
//         defaultLayout: 'main-layout', 
//         extname:'hbs'
//     })
// ); //we can change the extention 'hbs' using the expressHbs 

app.set('view engine','ejs');
// app.set('view engine','hbs');
app.set('views','views');

const adminRouts = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname,'public'))); //this is used to serve static files like css, images, etc

app.use('/admin',adminRouts);
app.use(shopRoutes);


// Move the 404 error handler to the end
app.use(errorController.get404Page);

app.listen(3000); //this is the same as the above two lines of code