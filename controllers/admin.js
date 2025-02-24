const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {

    // res.render('admin/add-product', {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
        // formsCSS: true,
        // productCSS: true,
        // activeAddProduct: true
    }); //.this is for the hbs also can use for ejs
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({ title: title, price: price, imgUrl: imgUrl, description: description, userId: req.user}); // this is the js object used in mongoose, also it's not depended on order, {key, value} - value which is collected by the postAddProduct

    // const product = new Product(title, price, description, imgUrl, null, req.user._id); // we have to pass the null for the id because when we add the product at that time not generate the id for that product
    product.save() // .save() mathod provided by the mongoose so we not need to create save()
        .then(result => {
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit; //This is the query string that we are looking for in the URL (edit-product?edit=true)
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode, //This is a flag that we can use in the template to determine if we are in edit mode or not
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.postEditProduct = (req, res, next) => {
    //we are basically constructing a new product and replace the existing product with the new one
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImgUrl = req.body.imgUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;

    // const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImgUrl, new ObjectId(prodId)); // because the ObjectId class has been imported or required separately. If we not import or require saprately then use 'new mongodb.ObjectId(prodId)'

    Product.findById(prodId).then(product => {
        product.title = updatedTitle;
        product.imgUrl = updatedImgUrl;
        product.price = updatedPrice;
        product.description = updatedDesc;
        return product.save()
    }).then(result => {
        console.log('updated product');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
    // const updatedProduct = new Product(prodId, updatedTitle, updatedImgUrl, updatedDesc, updatedPrice);
    // updatedProduct.save();
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId) // findByIdAndDelete is defined by the mongoose which is as same as deleteById() method which we create in Product
        .then(result => {
            console.log('Destroyed Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .populate('userId')
        .then(products => {
            // console.log(products);
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};
