const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie')
    //     .split(';')[2]
    //     .trim()
    //     .split('=')[1] === 'true';
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
        // isAuthenticated: req.isLoggedIn //This is a flag that we can use in the template to determine if the user is authenticated
    });
};
exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};
// User.findById('67bfec3128d771cc3f7bdee2')
//     .then(user => {
//         req.session.isLoggedIn = true;
//         req.session.user = user;
//         req.session.save(err => {
//             console.log(err);
//             res.redirect('/');
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });
// res.setHeader('set-Cookie', 'loggedIn=true');
// req.isLoggedIn = true; // storing the information that i am loggedin in this loggedin
// };
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;

    // console.log('Received data:', { email, password, confirmPassword });

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                console.log('User already exists');
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashPassword => {
            if (!hashPassword) return; // Stop if user already exists // you can also add nested chain loop this all hashpassword with bcrypt using .then
            const user = new User({
                email: email,
                password: hashPassword, // If hashing is needed, do it before saving
                cart: { items: [] }
            });
            console.log('Saving user to DB');
            user.save().then(() => {
                console.log('User saved successfully, redirecting to login');
                return res.redirect('/login');
            });
        })
        .catch(err => {
            console.error('Error during signup:', err);
            res.status(500).send("Internal Server Error");
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    }); // method provided by the session package, also it take the function
}