exports.get404Page = (req, res, next) => {
    res.status(404).render('404',{pageTitle: 'Error Page'});
    // res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
};

  