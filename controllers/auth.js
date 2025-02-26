
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
}
exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    // res.setHeader('set-Cookie', 'loggedIn=true');
    // req.isLoggedIn = true; // storing the information that i am loggedin in this loggedin
    res.redirect('/');
}
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    }); // method provided by the session package, also it take the function
}